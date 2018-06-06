const morgan = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');

const index = require("../routes/index.js");
const blogs = require('../routes/blog.js');
const auth = require('../routes/auth.js');

const passportSetup = require('./passport-setup');

const User = require('../model/user.js');

const config = function(app, express) {
// middlewares
    // form parsing
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // logger
    app.use(morgan('combined'));
    // method override
    app.use(methodOverride('_method'));
    // // override with different headers; last one takes precedence
    // accessibility for static files
    app.use(express.static('public'));

// Configure Passport
    passportSetup();

// Configure cookies
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // hour * minutes * seconds * miliseconds
        keys: [process.env.COOKIE_KEY]
    }));

// Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

// routes
    app.use('/', index);
    app.use('/auth', auth);
    app.use('/blog', blogs);
// HTML template engine setup
    // set engine
    app.set('views', 'views');
    app.set('view engine', 'pug');
    
};

module.exports = config;