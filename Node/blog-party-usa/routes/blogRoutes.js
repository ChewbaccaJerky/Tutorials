const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const filePath = path.join(path.dirname(__dirname), "seeds", "db.json");
const blogFile = fs.readFileSync(filePath, 'utf-8');
const blogArray = JSON.parse(blogFile);


const blogRoutes = function blogRoutes(app){
    app.get('/', (req, res)=>{
        res.render('index', {blogs: blogArray});
    });

    app.get('/blog/create', (req, res)=>{
        res.render("create");
    });

    app.post('/blog/create', (req, res)=>{
        const id = uuid();
        const blog = req.body;
        blog.id = id;
        blogArray.push(blog);
        fs.writeFile(filePath, JSON.stringify(blogArray));
        res.redirect('/');
    });
};

module.exports = blogRoutes;