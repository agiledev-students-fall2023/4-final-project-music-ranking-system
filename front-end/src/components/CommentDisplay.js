import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import '../css/Comments.css';

function CommentDisplay( {songName} ) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [songName]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${songName}`);
      setComments(response.data);
      console.log(comments);
    } catch (Error) {
      console.error("Error fetching comments")
    }
  };

  const addComment = async (newComment) => {
    setComments([...comments, newComment]);

    // You might want to update the server with the new comment as well
    // You can call an API endpoint to save the comment to the server
    // Example:
    // await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/save`, {
    //   postId: postId,
    //   username: newComment.username,
    //   comment: newComment.comment,
    // });
  };

  return (
    <div>
      <h2>Comments: </h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.username}: {comment.comment}</li>
        ))}
      </ul>
      <Comment onSubmit={addComment} songName={songName} />

    </div>
  );
}

export default CommentDisplay;