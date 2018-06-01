const morgan = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const index = require("../routes/index.js");
const blogs = require('../routes/blog.js');

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
    // app.use(methodOverride('X-HTTP-Method'));          // Microsoft
    // app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
    // app.use(methodOverride('X-Method-Override'));      // IBM
    // accessibility for static files
    app.use(express.static('public'));

    // routes
    app.use('/', index);
    app.use('/blog', blogs);

// HTML template engine setup
    // set engine
    app.set('views', 'views');
    app.set('view engine', 'pug');

};

module.exports = config;