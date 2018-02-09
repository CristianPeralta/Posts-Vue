var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController');

/* GET home page. */
router.get('/posts', postController.getPosts);
router.post('/posts', postController.addPost);

module.exports = router;
