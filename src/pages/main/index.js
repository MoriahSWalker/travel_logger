import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate(); //declaring useNavigate to a variable so I can use the function
  return (
    <div>
      <h1>Home Page</h1>
      {/* on click function to navigate to create post page */}
      <Button onClick={() => navigate("create")}>Create Post</Button>
    </div>
  );
  // this page will display 6 posts with their destination title and caption (click on post to view full description and comments)
  // option to view all posts
  // Create post component(go to create post)
};

export default Main;
