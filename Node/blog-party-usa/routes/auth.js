const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('./form/login', {user: req.user});
});

// auth logout
router.get('/logout', (req, res)=>{
    // handle with passport
    req.logout();
    res.redirect('/blog');
});

// google auth
router.get('/google', passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate("google"), (req, res)=>{
    console.log(req.user);
    // res.send("you reached callback uri");
    res.redirect('/blog');
});


module.exports = router;