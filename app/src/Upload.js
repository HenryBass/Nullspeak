import './App.css';
import React, { useState, useEffect } from "react";

function Feed() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    fetch(' http://localhost:3000/post', { method: "post", headers: {'Content-Type': 'application/json'}, mode: 'cors', body: JSON.stringify({'userID': formData.get("userID"), 'content': formData.get("content")})}).then(() => {window.location.href = '/'});
  }

  return (
    <div className='upload'>
    <h1>Create a post</h1>
    <form method="post" onSubmit={handleSubmit}>
      <input name="userID" className = 'postUser' placeholder="User Key" />
      <br></br>
        <textarea maxLength={256} className='postBody'
          name="content"
          placeholder="An interesting post"
          rows={6}
          cols={60}
        />
      <br></br>
      <button type="submit" className='postSubmit'>Post</button>
    </form>
    </div>
  );
}

export default Feed;
