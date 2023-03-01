import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";

const CreatePost = () => {
  const navigate = useNavigate();

  //to track the state of our input value we will useState
  const [post, setPost] = useState({
    photo: "",
    title: "",
    caption: "",
    description: "",
  });

  //   this function will handle the change in our state
  //   we destucture the variables we need from our event so they can be tracked in the even.target
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    // when setting the post we are taking in the previous value and making what we add the current value
    // saving what we type in the input to the state
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // checking that our state is changing with Effect hook, takes in an anonymous function and an array
  //   in the square brackets we put the post object so when that item changes the useEffect will run
  useEffect(() => {
    console.log(post);
  }, [post]);

  //   handles submit button functionality
  const handleClick = (event) => {
    event.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // navigating to the view posts page on submit
    navigate("view_posts");
  };

  return (
    <div>
      <h1>Create Post</h1>
      <Form>
        <FormGroup>
          <FormControl
            name="photo"
            value={""}
            type="file"
            onChange={handleChange}
          />
          <FormControl
            name="title"
            value={post.title}
            placeholder="title"
            onChange={handleChange}
          />
          <FormControl
            name="caption"
            value={post.caption}
            placeholder="caption"
            onChange={handleChange}
          />
          <FormControl
            name="description"
            value={post.description}
            placeholder="description"
            onChange={handleChange}
          />
        </FormGroup>
        <Button onClick={handleClick}>SUBMIT</Button>
      </Form>
      <Button onClick={() => navigate(-1)}>CANCEL</Button>
    </div>
  );
};

export default CreatePost;
