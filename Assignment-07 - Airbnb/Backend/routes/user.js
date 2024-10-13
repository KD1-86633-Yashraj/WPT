const express = require('express');
const pool = require('../db').pool;
const util =require('../utils')


//to create router (URL)
const router = express.Router();  


// - register ------------
// - login  --------------
// - change password -----
// - edit profile --------
// - wishlist  \/
// - delete an account ---


// +------------------+--------------+------+-----+-------------------+-------------------+
// | Field            | Type         | Null | Key | Default           | Extra             |
// +------------------+--------------+------+-----+-------------------+-------------------+
// | id               | int          | NO   | PRI | NULL              | auto_increment    |
// | firstName        | varchar(20)  | YES  |     | NULL              |                   |
// | lastName         | varchar(20)  | YES  |     | NULL              |                   |
// | email            | varchar(50)  | YES  |     | NULL              |                   |
// | password         | varchar(100) | YES  |     | NULL              |                   |
// | phoneNumber      | varchar(15)  | YES  |     | NULL              |                   |
// | isDeleted        | int          | YES  |     | 0                 |                   |
// | createdTimestamp | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// +------------------+--------------+------+-----+-------------------+-------------------+


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



//post for login user
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

    pool.query(query, [email, password], (error, result) => {
        if (error) {
            return res.status(400).json({ status: "error", message: error.message });
        }

        if (result.length === 0) {
            return res.status(401).json({ status: "error", message: "Invalid email or password." });
        }
            else {
            if (result.length == 0) {
                return res.status(401).json({ status: "error", message: "user does not exist" });
            } else {
                const user = result[0]
                if (user.isDeleted) {
                    return res.status(401).json({ status: "error", message: "Account deleted" });
                } else {
                    res.status(200).json({
                        status: "success",
                        data: result[0]
                    });
                    console.log("User logged in successfully.");
                }
            }
        }


        
    });
});



// put to change password
router.put('/changepassword',(req, res)=>{

    console.log("Change password")

    const {email, oldPassword, newPassword} = req.body;

    if(!email || !newPassword){
        return res.status(400).json({status: "error", message: "Invalid credentials."})
    }


    const query=`UPDATE user SET password = ? WHERE email = ? `;

    pool.query(query,[newPassword, email],(error, result)=>{
        if(error){
            return res.status(500).json({ status: "error", message: error.message });
        }
        res.status(200).json({

            status: "success",
            data: result
        });
        console.log("Password changed");
    })
})


//put to edit user
router.put('/edituser',(req, res)=>{
    console.log("Change user details")

    const {email,firstName, lastName, phoneNumber }= req.body

    if(!email || !firstName || !lastName || !phoneNumber){
        return res.status(400).json({status: "error", message: "Invalid credentials."})
    }

    const query =`UPDATE user SET firstName= ? , lastName= ? , phoneNumber = ? WHERE email = ? `
    pool.query(query,[firstName, lastName, phoneNumber,  email],(error, result)=>{

        if(error){
            return res.status(500).json({ status: "error", message: error.message });
        }

        res.status(200).json({
            status: "success",
            data: result
        })
        console.log("User details changed")
    })

})


//post to delete user
router.post('/deleteuser',(req, res)=>{

    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({status: "error", message: "Invalid credentials."})
    }

    const query= `UPDATE user  SET isDeleted = 1 WHERE email= ? && password = ? `

    pool.query(query, [email, password], (error, result)=>{
        
        if(error){
            return res.status(500).json({status:"error", message:"invalid credentials"})
        }

        res.status(201).json({
            status: "Success",
            data: result
        })
        console.log("user deleted")
    })

})

















router.get('/getusers', (req, res) => {
    console.log("Fetching users...");

    const query = "SELECT * FROM user WHERE  isDeleted = 0";
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



module.exports = router;
