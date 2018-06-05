const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const passportSetup = () => { 
  passport.use(
    new GoogleStrategy({
    // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },() => {
      // passport callback function

    })
  );
};

module.exports = passportSetup;