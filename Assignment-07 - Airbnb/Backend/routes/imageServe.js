// routes.js
const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files from the "data/iconImages" folder
const imageDirectory = path.join(__dirname, '../data/iconImages/');

//get
router.use('/', express.static(imageDirectory));




module.exports = router;
