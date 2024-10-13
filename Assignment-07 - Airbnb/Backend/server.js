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
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());

// app.use((request,response,next)=>{


//     if(
//         request.url==='/user/login' ||
//         request.url==='/user/register' ||
//         request.url==='/user/getusers'
//     ){

//         next()
        
//     }
//     else{
//         console.log("Success")
//     }
// })

app.use('/user', userRoutes);
app.use('/category', catagoryRouter)
app.use('/images', imageRouter)
app.use('/bookings', bookingRouter)



server.listen(9999,()=>{
    console.log("server is running on port 9999")
})