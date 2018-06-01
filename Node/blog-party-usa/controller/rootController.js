const BlogController = require('./blogController.js');

const RootController = (app)=>{
    BlogController(app);
};

module.exports = RootController;
