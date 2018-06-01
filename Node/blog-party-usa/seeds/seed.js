const Blog = require('../model/blog.js');

const seedDB = () => {

    const defaultBlogs = [
        {author: "John Robin", title: "First Post", body: "This is my first post!"},
        {author: "James Cameron", title: "Hello There", body: "Hi everyone!"},
        {author: "Rick", title: "Dammit Morty!", body: "Drop everything let's go!"},
        {author: "Morty", title: "Rick", body: "No go home!"},
    ];

    Blog.insertMany(defaultBlogs, (err, docs)=> {
        if(err){
            console.log(err);
        }
        else {
            console.log(docs);
        }
    });
};

module.exports = seedDB;