const express = require('express');
const router = express.Router();

const blogController = require('../controller/blogController.js');

router.get('/', (req, res)=>{
    res.redirect('/auth/login');
});

module.exports = router;