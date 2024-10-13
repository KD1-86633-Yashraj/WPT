const pool = require('../db').pool;
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const router = express.Router();  


// +------------------+---------------+------+-----+-------------------+-------------------+
// | Field            | Type          | Null | Key | Default           | Extra             |
// +------------------+---------------+------+-----+-------------------+-------------------+
// | id               | int           | NO   | PRI | NULL              | auto_increment    |
// | title            | varchar(20)   | YES  |     | NULL              |                   |
// | details          | varchar(1000) | YES  |     | NULL              |                   |
// | image            | varchar(200)  | YES  |     | NULL              |                   |
// | createdTimestamp | datetime      | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// +------------------+---------------+------+-----+-------------------+-------------------+





router.get('/', (req, res) => {

    const query = `SELECT id, title, details, image FROM category`;

    console.log("reached");
    pool.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        // Map over the results to include the full image URL
        const dataWithImageUrls = result.map((item) => ({
            id: item.id,
            title: item.title,
            details: item.details,
            image: `${req.protocol}://${req.get('host')}/images/${item.image}`
        }));

        res.status(200).json({
            status: "success",
            data: dataWithImageUrls
        });
        console.log("categories fetched successfully.");
    });
});








const uploadDirectory = path.join(__dirname, '../data/images');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

//post to add category
router.post('/', upload.single('image'), (req, res) => {
    const { title, details } = req.body;
    const image = req.file;

    if (!title || !details || !image) {
        return res.status(400).json({ status: "error", message: "Please provide all required fields" });
    }

    const imagePath = `${image.filename}`;
    const query = `INSERT INTO category (title, details, image) VALUES (?, ?, ?)`;

    pool.query(query, [title, details, imagePath], (error, result) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(201).json({
            status: "success",
            message: "Category added successfully",
            data: { id: result.insertId, title, details, image: imagePath }
        });
        console.log("Category added successfully.");
    })
})


module.exports=router