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

module.exports.updatePost = async (req, res) => {
  try {
    const data = req.body;
    const post = await Post.findById(data._id);
    post.title = data.title;
    post.description = data.description;
    await post.save();
    return res.json(200);
  } catch (error) {
    if(error) res.status(500).send(error);
  }
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

module.exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
    return res.json(200);
  } catch (error) {
    console.log(error);
    if(error) res.status(500).send(error);
  }
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
