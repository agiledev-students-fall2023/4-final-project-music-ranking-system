import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import PostComment from './PostComment.js';
import PostCommentForm from './PostCommentForm.js';
import { useAuthContext } from "./AuthProvider.js";

function Post() {
  const currentuser = useAuthContext().user;
  const {songArtist, songTitle, username} = useParams()
  const [song, setSong] = useState([])
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const addCommentToList = comment => {
    const newComments = [comment, ...comments] 
    setComments(newComments) 
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${songArtist}/${songTitle}/${username}`)
      .then(response => {
        setSong(response.data.song)
        setPost(response.data.post)
        setComments([...response.data.post.comments])
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle, username])

  return (
    <div className="Post">
      {post.username == currentuser? <h3><Link to={`/profile-review`}>{username}</Link>'s Review</h3> : <h3><Link to={`/other-user/${post.username}`}>{username}</Link>'s Review</h3>}
      <h3>{song.artist} - {song.title}</h3>
      <img src={song.coverSrc} alt="album cover" />
      <h4>{post.rating}/10</h4>
      <p>{post.review}</p>
      <h3>Comments:</h3>
        {comments.map((comment, i) => (<PostComment key={i} comment={comment}/>))}
      <h3>Comment:</h3>
        <PostCommentForm addCommentToList={addCommentToList} songArtist={songArtist} songTitle={songTitle} username={username}/>
    </div>
  )
}

export default Post;