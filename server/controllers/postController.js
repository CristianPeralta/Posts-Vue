var Post = require('../models/Post');

module.exports.getPosts = function (req,res) {
  Post.find().exec(function (err,user) {
    if(err) return res.json(503);

    return res.json(user);
  })
}

module.exports.addPost = function (req,res) {
  var data = req.body;
  var newPost = new Post({
    title: data.title,
    description:data.description
  });
  newPost.save(function (err) {
    if (err) return res.status(500).send(err);
    return res.sendStatus(200);
  })
}
