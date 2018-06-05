const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const passportSetup = () => { 
  passport.use(
    new GoogleStrategy({
    // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },(accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(profile);
      console.log("passport callback function fired");
      
    })
  );
};

module.exports = passportSetup;