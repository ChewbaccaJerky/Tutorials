const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('./form/login');
});

// auth logout
router.get('/logout', (req, res)=>{
    // handle with passport
    res.send('loggin out');
});

// google auth
router.get('/google', passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate("google"), (req, res)=>{
    res.send("you reached callback uri");
});


module.exports = router;