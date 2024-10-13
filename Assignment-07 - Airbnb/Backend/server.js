const pool = require('./db').pool
;const utils=require("./utils")
const cors=require('cors')
const http=require("http")
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const catagoryRouter = require('./routes/category')
const imageRouter= require('./routes/imageServe')
const bookingRouter= require('./routes/booking')
const propertyRouter=require('./routes/property')

const jwt= require('jsonwebtoken')
const sKey=require('./config').secret
const jwtVerify=require('./middleware/authMiddleware')
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());

// app.use((request,response,next)=>{


//     if(
//         request.url==='/user/'  ||
//         request.url==='/user/registration' ||
//         request.url==='/user/login' ||
//         request.url==='/user/deleteuser'  ||
//         request.url==='/user/'  ||
//         request.url==='/user/'  

//     ){

//         next()
        
//     }
//     else{
//         console.log("URL not valid")
//     }
// })

app.use('/user', userRoutes);
app.use('/category', catagoryRouter)
app.use('/images', imageRouter)
app.use('/bookings', bookingRouter)
app.use('/property',propertyRouter)



server.listen(9999,()=>{
    console.log("server is running on port 9999")
})