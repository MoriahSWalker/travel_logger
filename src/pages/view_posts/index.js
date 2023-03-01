import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import "./index.css";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const ViewPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // to get our data from the backend we will use useEffect Hook
  useEffect(() => {
    axios
      .get("/view_posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // delete post function from DeleteButton onClick
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updatePost = (post) => {
    setUpdatedPost(post);
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);
    axios
      .put(`/update/${updatedPost._id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };
  return (
    <div id="main-div">
      <h1>Displaying Posts</h1>

      {posts ? (
        <>
          {posts.map((post) => {
            return (
              <div id="post-div" key={post._id}>
                <h3>{post.title}</h3>
                <h6>{post.caption}</h6>
                <p>{post.description}</p>
                <div id="button-div">
                  <Button
                    variant="outline-secondary"
                    onClick={() => updatePost(post)}
                    id="updatebtn"
                  >
                    UPDATE
                  </Button>
                  <Button
                    onClick={() => deletePost(post._id)}
                    variant="outline-danger"
                    id="deletebtn"
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
      <Button
        id="backbtn"
        variant="outline-dark"
        onClick={() => {
          navigate(-1);
        }}
      >
        BACK
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update this post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormControl
                className="input-fields"
                type="file"
                placeholder="photo"
                name="photo"
                value={updatedPost.photo ? updatedPost.photo : ""}
                onChange={handleChange}
              ></FormControl>
              <FormControl
                className="input-fields"
                placeholder="title"
                name="title"
                value={updatedPost.title ? updatedPost.title : ""}
                onChange={handleChange}
              ></FormControl>
              <FormControl
                className="input-fields"
                placeholder="caption"
                name="caption"
                value={updatedPost.caption ? updatedPost.caption : ""}
                onChange={handleChange}
              ></FormControl>
              <FormControl
                className="input-fields"
                placeholder="description"
                name="description"
                value={updatedPost.description ? updatedPost.description : ""}
                onChange={handleChange}
              ></FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewPosts;