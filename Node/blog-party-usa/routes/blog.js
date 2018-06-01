const express = require('express');
const router = express.Router();

const blogController = require('../controller/blogController');

// List Blog Page
router.get('/', blogController.blog_list);

// Detail Page
router.get('/:id/show', blogController.blog_detail);

// Create New Blog Form -> GET
router.get('/create', blogController.blog_create_get);

// Create New Blog -> POST
router.post('/create', blogController.blog_create_post);

// Edit Blog -> GET
router.get('/:id/edit', blogController.blog_edit_get);

// Edit Blog -> Put
router.post('/update', blogController.blog_edit_put);

// Delete Blog
router.delete('/delete', blogController.blog_delete);

module.exports = router;