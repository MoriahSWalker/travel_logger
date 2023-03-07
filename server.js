const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Post = require("./models/post");
const path = require("path");
// logs the different request to our server
const logger = require("morgan");
// cross origin access
const cors = require("cors");
const app = express();
// access
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
// parse stringified json data
app.use(express.json());

// server build folder
app.use(express.static(path.join(__dirname, "build")));

let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.vc6edgd.mongodb.net/TravelBlogDatabase?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
// app.get("/", (req, res) => {
//   console.log("good request");
// });
// CREATE ROUTE
app.post("/create", async (req, res) => {
  const {
    photo: photo,
    title: title,
    caption: caption,
    description: description,
  } = req.body;

  let returnedData = await Post.create({
    photo,
    title,
    caption,
    description,
  });
  res.send(returnedData);
});

// READ/GET ROUTE
app.get("/view_posts", (req, res) => {
  Post.find() //meaning we want to find all of the items in this collection
    .then((items) => res.json(items)) // then sending these items back to the client side
    .catch((err) => console.log(err));
});

// UPDATE/PUT ROUTE
app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      photo: req.body.photo,
      title: req.body.title,
      caption: req.body.caption,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

// DELETE ROUTE
app.delete("/delete/:id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(4000, () => {
  console.log(`Server is Listening on 4000`);
});
