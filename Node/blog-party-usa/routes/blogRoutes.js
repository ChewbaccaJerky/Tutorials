const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const Blog = require('../model/blog.js');
const filePath = path.join(path.dirname(__dirname), "seeds", "db.json");
const blogFile = fs.readFileSync(filePath, 'utf-8');
let blogArray = JSON.parse(blogFile);


const blogRoutes = function blogRoutes(app){
    app.get('/', (req, res)=>{
        Blog.find({}, (err, blogs)=>{
            res.render('index', {blogs: blogs});
        });
    });

    app.get('/blog/create', (req, res)=>{
        res.render("create");
    });

    app.post('/blog/create', (req, res)=>{
        // const id = uuid();
        // const blog = req.body;
        
        // blog.id = id;
        // blogArray.push(blog);
        // fs.writeFile(filePath, JSON.stringify(blogArray));
        // res.redirect('/');

        const blog = new Blog(req.body);
        blog.save((err, post)=>{
            console.log(`${post} has been saved`);
            res.redirect('/');
        });
    });

    app.get('/blog/:id/edit', (req, res)=>{
        // let blog;
        
        // for(let i = 0; i < blogArray.length; i++) {
        //     if(blogArray[i]["id"] == req.params.id) {
        //         blog = blogArray[i];
        //         break;
        //     }
        // }
        
        // if(blog) {
        //     res.render("edit", {blog: blog});
        // }
        // else {
        //     res.redirect('/');
        // }

        Blog.findOne({_id: req.params.id}, (err, blog)=>{
            if(blog) {
                res.render("edit", {blog: blog});
            } 
            else {
                res.redirect('/');
            }
        });
    });

    app.put('/blog/update', (req, res)=>{
        // const blog = req.body;

        // for(let i = 0; i < blogArray.length; i++) {
        //     if(blogArray[i]["id"] == blog.id) {
        //         blogArray[i] = blog;
        //         break;
        //     }
        // }
    
        // fs.writeFile(filePath, JSON.stringify(blogArray));
        // res.redirect('/');
        // console.log(req.body);
        const _id = req.body._id;
        Blog.updateOne({_id: _id}, req.body, (err, raw)=>{
            if(!err){
                res.redirect('/');
            }
            else {
                // TODO: handle error response
                console.log(err);
            }
        });
        
    });

    app.delete('/blog/delete', (req, res)=>{
        // const id = req.body.id;
        // let idx;
        // for(let i = 0; i < blogArray.length; i++) {
        //     if(blogArray[i]["id"] == id) {
        //         idx = i;
        //         break;
        //     }
        // }

        // if(idx) {
        //     blogArray = blogArray.slice(0, idx).concat(blogArray.slice(idx+1));
        //     fs.writeFile(filePath, JSON.stringify(blogArray));
        // }
        // res.redirect('/');

        Blog.deleteOne({_id: req.body._id}, (err)=>{
            if(err) {
                console.log(err);    
            }
            res.redirect('/');
        });
    });
};


module.exports = blogRoutes;