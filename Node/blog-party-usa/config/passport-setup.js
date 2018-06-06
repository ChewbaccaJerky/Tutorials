const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../model/user');

const passportSetup = (app) => { 

  // setup cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // get cookie
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });



  passport.use(
    new GoogleStrategy({
    // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },(accessToken, refreshToken, profile, done) => {
      console.log("passport callback function fired");

      // Check if user exists in db
      User.findOne({googleId: profile.id}, (err, user)=>{
        if(user) {
          console.log(user);
          done(null, user);
        }
        else {
          new User({
            username: profile.displayName,
            googleId: profile.id
          }).save().then((newUser) => {
            console.log('new user created.... ' + newUser);
            done(null, newUser);
          });
        }
      });
    })
  );

};

module.exports = passportSetup;