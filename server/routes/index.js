var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/posts', function(req, res, next) {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
});

module.exports = router;
