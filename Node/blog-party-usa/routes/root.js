const blogRoutes = require('./blogRoutes.js');

const createRoutes = function createRoutes(app) {
    
    blogRoutes(app);
};

module.exports = createRoutes;