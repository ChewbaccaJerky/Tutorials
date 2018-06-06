const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const Blog = require('../model/blog.js');
const filePath = path.join(path.dirname(__dirname), "seeds", "db.json");
const blogFile = fs.readFileSync(filePath, 'utf-8');
let blogArray = JSON.parse(blogFile);


exports.blog_list = (req, res) => {
    Blog.find((err, blogs) => {
        res.render('./blog/index', { blogs: blogs, user: req.user });
    });
};

exports.blog_detail = (req, res) => {
    Blog.find({ _id: req.params.id }, (err, blog) => {
        if (err) {
            res.status(400).end('Could not find blog');
        }
        res.render('index', { blogs: blog });
    });
};

exports.blog_create_get = (req, res) => {
    res.render("./form/create");
};

exports.blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save((err, post) => {
        console.log(`${post} has been saved`);
        res.redirect('/');
    });
};

exports.blog_edit_get = (req, res) => {
    Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (blog) {
            res.render("./form/edit", { blog: blog });
        }
        else {
            res.redirect('/');
        }
    });
};

exports.blog_edit_put = (req, res) => {
    const _id = req.body._id;
    Blog.updateOne({ _id: _id }, req.body, (err, raw) => {
        if (!err) {
            res.redirect('/');
        }
        else {
            // TODO: handle error response
            console.log(err);
        }
    });
};

exports.blog_delete = (req, res) => {
    Blog.deleteOne({ _id: req.body._id }, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
};