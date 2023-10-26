import React, { useState } from 'react';

function Comment({ onSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
        <div class="input-group">
          <label for="comment">Add Comment: </label><br/>
          <textarea id="song-comment" value={comment} name="song-comment" onChange={(e) => setComment(e.target.value)} placeholder="Enter a comment" rows="10"></textarea>
        </div>
        <br/>
    
        <div class="button">
          <input type="submit" value="Enter"/>
        </div>
    </form>
  );
}

export default Comment;