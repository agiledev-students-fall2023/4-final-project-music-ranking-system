import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import PostComment from './PostComment.js';
import PostCommentForm from './PostCommentForm.js';

function Post() {
  const [currentuser, setCurrentUser] = useState("");
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
        setCurrentUser(res.data.user.username)
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


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
        console.log("song", song);
        setPost(response.data.post)
        console.log("post", post);

        if (response.data.post.comments) {
          setComments([...response.data.post.comments])
          console.log("set comments");
        }
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle, username])

  return (
    <div className="Post">
      {username == currentuser? <h3><Link to={`/profile`}>{username}</Link>'s Review</h3> : <h3><Link to={`/other-user/${username}`}>{username}</Link>'s Review</h3>}
      <h3>{song.artist} - {song.title}</h3>
      <img src={song.coverSrc} alt="album cover" />
      <h4>{post.rating}/10</h4>
      <p>{post.review}</p>
      <h3>Comments:</h3>
        {comments.map((comment, i) => (<PostComment key={i} comment={comment}/>))}
      {isLoggedIn && 
      <>
        <h3>Comment:</h3>
        <PostCommentForm addCommentToList={addCommentToList} songArtist={songArtist} songTitle={songTitle} username={username}/>
      </>}
    </div>
  )
}

export default Post;