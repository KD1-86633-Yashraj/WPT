const express = require('express');
const pool = require('../db').pool;
const util =require('../utils')

const router = express.Router();

// - add a property ----------
// - list the properties ----------
// - show property details---------
// - show similar properties
// - search properties
// - rate (feedback) a property
// - get my rented properties


// +------------------+---------------+------+-----+-------------------+-------------------+
// | Field            | Type          | Null | Key | Default           | Extra             |
// +------------------+---------------+------+-----+-------------------+-------------------+
// | id               | int           | NO   | PRI | NULL              | auto_increment    |
// | categoryId       | int           | YES  |     | NULL              |                   |
// | title            | varchar(100)  | YES  |     | NULL              |                   |
// | details          | varchar(1000) | YES  |     | NULL              |                   |
// | address          | varchar(1000) | YES  |     | NULL              |                   |
// | contactNo        | varchar(15)   | YES  |     | NULL              |                   |
// | ownerName        | varchar(50)   | YES  |     | NULL              |                   |
// | isLakeView       | int           | YES  |     | 0                 |                   |
// | isTV             | int           | YES  |     | 0                 |                   |
// | isAC             | int           | YES  |     | 0                 |                   |
// | isWifi           | int           | YES  |     | 0                 |                   |
// | isMiniBar        | int           | YES  |     | 0                 |                   |
// | isBreakfast      | int           | YES  |     | 0                 |                   |
// | isParking        | int           | YES  |     | 0                 |                   |
// | guests           | int           | YES  |     | NULL              |                   |
// | bedrooms         | int           | YES  |     | NULL              |                   |
// | beds             | int           | YES  |     | NULL              |                   |
// | bathrooms        | int           | YES  |     | NULL              |                   |
// | rent             | float         | YES  |     | NULL              |                   |
// | profileImage     | varchar(100)  | YES  |     | NULL              |                   |
// | createdTimestamp | datetime      | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// +------------------+---------------+------+-----+-------------------+-------------------+

// {
//     "categoryId": 1,
//     "title": "Lakeview Apartment",
//     "details": "This is a beautiful apartment with a view of the lake.",
//     "address": "123 Main Street, City, State",
//     "contactNo": "1234567890",
//     "ownerName": "John Doe",
//     "isLakeView": 1,
//     "isTV": 1,
//     "isAC": 1,
//     "isWifi": 1,
//     "isMiniBar": 1,
//     "isBreakfast": 1,
//     "isParking": 1,
//     "guests": 4,
//     "bedrooms": 2,
//     "beds": 4,
//     "bathrooms": 2,
//     "rent": 1000.00,
//     "profileImage": "apartment.jpg",
//   }




//post to add property
router.post('/',(req,res)=>{
    const {
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        profileImage
        }= req.body;

        const query=`Insert into property(
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        profileImage)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`


        pool.query(query,[
            categoryId,
            title,
            details,
            address,
            contactNo,
            ownerName,
            isLakeView,
            isTV,
            isAC,
            isWifi,
            isMiniBar,
            isBreakfast,
            isParking,
            guests,
            bedrooms,
            beds,
            bathrooms,
            rent,
            profileImage],(err,result)=>{
                if (err) {
                    return res.status(500).json({ status: "error", message: err.message });
                }
        
                res.status(200).json({
                    status: "success",
                    data: result
                });
                console.log("booked successfully.");
            })



})






// get all properties
router.get('/', (req, res) => {

    const query = "SELECT * FROM property";
    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: results
        });
        console.log("Property fetched successfully.");
    });
});





//to get property by id
router.get('/details/:id', (req, res) => {

    const propertyId= req.params.id

    const query = "SELECT id, title, details, rent, profileImage FROM property where id= ? ";
    pool.query(query, [propertyId], (error, results) => {
        if (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: results
        });
        console.log("Property fetched successfully.");
    });
});



module.exports= router