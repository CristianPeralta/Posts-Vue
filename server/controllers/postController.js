var Post = require('../models/Post');

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({_id: -1});
    return res.json(posts);
  } catch (error) {
    if(error) res.json(503);
  }
}

module.exports.getPostsSocket = function (cb) {
  Post.find({},function (err,posts) {
    return cb(posts, err);
  }).sort({_id:-1})
}

module.exports.addPost = async (req, res) => {
  try {
    const data = req.body;
    const newPost = new Post({
      title: data.title,
      description:data.description
    });
    const post = await newPost.save();
    return res.json(post);
  } catch (error) {
    if (error) res.status(500).send(error);
  }
}

module.exports.addPostSocket = function (data, cb) {
  var newPost = new Post(data);
  newPost.save(function (err,post) {
    return cb(post, err);
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

module.exports.updatePostSocket = function (data, cb) {
  Post.findOne({_id:data._id},function (err,post) {
    if(err) return cb(post, err);
    if (!post) return cb(post, err);
    post.title = data.title;
    post.description = data.description;
    post.save(function (err, post) {
      if (err) return err;
      return cb(post, err);
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

module.exports.deletePostSocket = function (id, cb) {
  Post.findOne({_id:id},function (err,post) {
    if(err) return cb(err);
    if (!post) return cb(err);
    post.remove(function (err) {
      return cb(err);
    })
  })
}
