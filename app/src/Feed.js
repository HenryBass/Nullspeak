import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from './Post.js'

function Feed() {
  
  let [posts, setPosts] = useState([{userID: "Loading", content: "Loading"}]);

  useEffect(() => {
    axios.get("https://social-backend-2ck7.onrender.com/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="Feed">
    {posts.map(post => <Post postContent = {post}/>)}
    <p>Only the most recent posts are visible!</p>
    </div>
  );
}

export default Feed;