import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const NavBar = () => {
  return (
    <nav id="nav-bar">
      <Link className="link-tag" to="/">
        <div>Home</div>
      </Link>
      <Link className="link-tag" to="/create">
        <div>New Post</div>
      </Link>
      <Link className="link-tag" to="/create/view_posts">
        Edit Post
      </Link>
    </nav>
  );
};

export default NavBar;
