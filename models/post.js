const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  photo: String,
  title: String,
  caption: String,
  description: String,
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
