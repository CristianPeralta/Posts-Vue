var Post = require('../models/Post');

module.exports.getPosts = function (req,res) {
  Post.find({},function (err,posts) {
    if(err) return res.json(503);
    return res.json(posts);
  }).sort({_id:-1})
}

module.exports.addPost = function (req,res) {
  var data = req.body;
  var newPost = new Post({
    title: data.title,
    description:data.description
  });
  newPost.save(function (err,post) {
    if (err) return res.status(500).send(err);
    return res.json(post);
  })
}

module.exports.updatePost = function (req,res) {
  var data = req.body;
  Post.findOne({_id:data._id},function (err,post) {
    if(err) return res.status(500).send(err);
    if (!post) return res.status(404).send(err);
    post.title = data.title;
    post.description = data.description;
    post.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.json(200);
    })
  })
}

module.exports.deletePost = function (req,res) {
  var data = req.params.id;
  Post.findOne({_id:data},function (err,post) {
    if(err) return res.status(500).send(err);
    if (!post) return res.status(404).send(err);
    post.remove(function (err) {
      if (err) return res.status(500).send(err);
      return res.json(200);
    })
  })
}
