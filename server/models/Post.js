var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type:String, required:'Title is required'},
  description: {type:String, default: 'Description ...'}
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
