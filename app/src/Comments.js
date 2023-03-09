import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from './Post.js'
import Reply from './Reply.js'

function Comments() {
  
  let [posts, setPosts] = useState([{userID: "Loading", content: "Loading", timestamp: Date.now()}]);
  let [mainpost, setMainPost] = useState([{userID: "Loading", content: "Loading", timestamp: Date.now()}]);

  useEffect(() => {
    axios.get("https://null.cyclic.app:3000/getComments?" + new URLSearchParams({
      query: window.location.search.slice(1)
    }))
    .then((response) => {
        setPosts(response.data);
    });
    axios.get("https://null.cyclic.app:3000/findById?" + new URLSearchParams({
      query: window.location.search.slice(1)
    }))
    .then((response) => {
        setMainPost(response.data);
    });
  }, []);

  return (
    <div className="Feed">
      <Post postContent = {mainpost[0]}/>
      <Reply/>
      {posts.map(post => <Post postContent = {post}/>)}
    </div>
  );
}

export default Comments;
