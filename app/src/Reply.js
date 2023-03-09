import './App.css';
import React, { useState, useEffect } from "react";

function Reply() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    fetch(' https://null.cyclic.app0/post', 
    { method: "post",
     headers: {'Content-Type': 'application/json'},
    mode: 'cors',
      body: JSON.stringify({'userID': formData.get("userID"),
      'content': formData.get("content"), replyTo: window.location.search.slice(1)})})
      .then(() => {window.location.reload()});
  }

  return (
    <div>
    <h2>Reply</h2>
    <form method="post" onSubmit={handleSubmit}>
      <input name="userID" className = 'postUser' placeholder="User Key" />
      <br></br>
        <textarea maxLength={128} className='postBody'
          name="content"
          placeholder="An interesting reply"
          rows={6}
          cols={60}
        />
      <br></br>
      <button type="submit" className='postSubmit'>Reply</button>
    </form>
    </div>
  );
}

export default Reply;
