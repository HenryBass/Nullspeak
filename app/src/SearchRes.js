import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from './Post.js'

function SearchRes() {
  
  let [posts, setPosts] = useState([{userID: "Loading", content: "Loading"}]);

  useEffect(() => {
    console.log(window.location.search.slice(1))
    axios.get("https://social-backend-2ck7.onrender.com/search?" + new URLSearchParams({
      query: window.location.search.slice(1)
    }))
    .then((response) => {
        setPosts(response.data);
    });
  }, []);

  return (
    <>
      {posts.map(post => <Post postContent = {post}/>)}
      <p>Only the most recent posts are visible!</p>
    </>
  );
}

export default SearchRes;
