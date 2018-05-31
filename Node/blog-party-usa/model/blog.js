const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
        id: String,
        author: String,
        title: String,
        body: String,
        createdAt: Date,
        updatedAt: Date
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;