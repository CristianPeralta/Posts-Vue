var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController');

/* GET home page. */
router.get('/posts', postController.getPosts);
router.post('/posts', postController.addPost);
router.put('/post', postController.updatePost);
router.delete('/post/:id', postController.deletePost);

module.exports = router;
