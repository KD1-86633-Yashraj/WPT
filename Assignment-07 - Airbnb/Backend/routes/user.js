const express = require('express');
const pool = require('../db').pool;  

const router = express.Router();  

// POST route for user registration
router.post('/registration', (req, res) => {
    console.log("Request Body:", req.body);

    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    const query = `
        INSERT INTO user(firstName, lastName, email, password, phoneNumber) 
        VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(query, [firstName, lastName, email, password, phoneNumber], (error, results) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
        res.status(201).json({
            status: "success",
            data: results
        });
        console.log("User successfully inserted.");
    });
});

router.get('/getusers', (req, res) => {
    console.log("Fetching users...");

    const query = "SELECT * FROM user";
    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: results
        });
        console.log("Users fetched successfully.");
    });
});


router.post('/login', (req, res) => {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and password are required." });
    }

    const query = `
        SELECT * FROM user 
        WHERE email = ? AND password = ?
    `;

    pool.query(query, [email, password], (error, results) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ status: "error", message: "Invalid email or password." });
        }

        res.status(200).json({
            status: "success",
            data: results[0]
        });
        console.log("User logged in successfully.");
    });
});



module.exports = router;
