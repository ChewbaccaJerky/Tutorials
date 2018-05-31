const morgan = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const config = function(app, express) {
// middlewares
    // form parsing
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // logger
    app.use(morgan('combined'));
    // method override
    app.use(methodOverride('_method'));
    // accessibility for static files
    app.use(express.static('public'));

    // set engine
    app.set('views', 'views');
    app.set('view engine', 'pug');

};

module.exports = config;