const pool = require('../db').pool;
const express = require('express');


const verifyToken= require('../middleware/authMiddleware')


const router=express.Router()
// +------------------+-------------+------+-----+-------------------+-------------------+
// | Field            | Type        | Null | Key | Default           | Extra             |
// +------------------+-------------+------+-----+-------------------+-------------------+
// | id               | int         | NO   | PRI | NULL              | auto_increment    |
// | userId           | int         | YES  |     | NULL              |                   |
// | propertyId       | int         | YES  |     | NULL              |                   |
// | fromDate         | varchar(50) | YES  |     | NULL              |                   |
// | toDate           | varchar(50) | YES  |     | NULL              |                   |
// | total            | float       | YES  |     | NULL              |                   |
// | createdTimestamp | datetime    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// +------------------+-------------+------+-----+-------------------+-------------------+



// - get my bookings----------------
// - book a property-----------
// - cancel a booking




router.get('/', verifyToken,(req,res)=>{

    const query=`SELECT * from bookings`
    pool.query(query,(err,result)=>{
        if (err) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: result
        });
        console.log("bookings fetched successfully.");
    })
})


//get booking by id
router.get('/getbookings/:userid',(req,res)=>{


    const userId=req.params.userid
    
    const query=`SELECT * from bookings where userId= ?`
    pool.query(query,[userId],(err,result)=>{
        if (err) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: result
        });
        console.log("bookings fetched successfully.");
    })
})





//post to insert booking details
router.post('/:userid',(req,res)=>{

    const {propertyId, fromDate, toDate, total} = req.body
    const userId= req.params.userid
    
    console.log(req.body)
    const query = `INSERT INTO bookings(userId, propertyId, fromDate, toDate, total)  VALUES(?, ?, ?, ?, ?)`

    pool.query(query,[userId, propertyId, fromDate, toDate, total ],(err,result)=>{
        if (err) {
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: result
        });
        console.log("booked successfully.");
    })
})


module.exports=router