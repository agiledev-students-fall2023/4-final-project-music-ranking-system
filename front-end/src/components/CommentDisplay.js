import React, { useState } from 'react';
import Comment from './Comment';
import '../css/Comments.css';

function CommentDisplay() {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h2>Comments: </h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.user}: {comment.comment}</li>
        ))}
      </ul>
      <Comment onSubmit={addComment} />

    </div>
  );
}

export default CommentDisplay;