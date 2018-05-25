const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(__dirname), "seeds", "db.json");
const blogFile = fs.readFileSync(filePath, 'utf-8');
const blogArray = JSON.parse(blogFile)["blogs"];


const blogRoutes = function blogRoutes(app){
    console.log(blogArray);
    app.get('/', (req, res)=>{
        // res.render('index', {blogs: blogArray});
        res.render('index', {blogArray: blogArray});
    });
};

module.exports = blogRoutes;