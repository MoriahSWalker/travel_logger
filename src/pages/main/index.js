import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
const Main = () => {
  const navigate = useNavigate(); //declaring useNavigate to a variable so I can use the function
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    axios
      .get("/view_posts")
      .then((res) => {
        console.log(res);
        setBlogPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Oh The Places We Will Go...</h1>
      <div id="post-container">
        {blogPost.map((post) => {
          return (
            <div id="blog-post-div" key={post._id}>
              <img src={post.photo} alt="" />
              <h2>{post.title}</h2>
              <h4>{post.caption}</h4>
              <p>{post.description}</p>
            </div>
          );
        })}
      </div>
      {/* on click function to navigate to create post page */}
      <Button onClick={() => navigate("create")}>Create Post</Button>
    </div>
  );
  // this page will display 6 posts with their destination title and caption (click on post to view full description and comments)
  // option to view all posts
  // Create post component(go to create post)
};

export default Main;
