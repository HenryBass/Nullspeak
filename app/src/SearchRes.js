import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from './Post.js'

function SearchRes() {
  
  let [posts, setPosts] = useState([{userID: "Loading", content: "Loading", timestamp: Date.now()}]);

  useEffect(() => {
    console.log(window.location.search.slice(1))
    axios.get("https://null.cyclic.app0/query?" + new URLSearchParams({
      query: window.location.search.slice(1)
    }))
    .then((response) => {
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

export default SearchRes;
