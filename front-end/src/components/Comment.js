import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useAuthContext } from "./AuthProvider.js";
import axios from 'axios';
import '../css/Comments.css';
import CommentPostForm from './CommentPostForm.js';
import CommentPost from './CommentPost.js';


function Comment() {
  const username = useAuthContext().user;
  const [comments, setComments] = useState('');
  const {songArtist, songTitle} = useParams();
  const [showForm, setShowForm] = useState(true);
  const addCommentToList = comment => {
    const newComments = [comment, ...comments]
    setComments(newComments)
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${songArtist}/${songTitle}/${username}`)
      .then(response => {
        const comments = response.data;
        console.log(comments);
        setComments(comments);
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle, username])

  useEffect(() => {
    console.log(comments);
    comments.localeCompare((comment) => {
      if (comment.username === username) {
        setShowForm(false)
      }
    })
  }, [comments])

if (comments) {
  return (
    <div className="Comment">
      {showForm && 
        <>
          <h3>Add Comment:</h3>
          <CommentPostForm setShowForm={setShowForm} addCommentToList={addCommentToList} songArtist={songArtist} songTitle={songTitle} username={username}/>
        </>
      }
      <h3>Other comments:</h3>
        {comments.map((comment, i) => (
          <CommentPost key={i} comment={comment} songArtist={songArtist} songTitle={songTitle} username={username}/>
        ))}
    </div>
  );
}
else {
  return (
    <div className="Comment">
      {showForm && 
        <>
          <CommentPostForm setShowForm={setShowForm} addCommentToList={addCommentToList} songArtist={songArtist} songTitle={songTitle} username={username}/>
        </>
      }
    </div>
  );
}
 
};

export default Comment;