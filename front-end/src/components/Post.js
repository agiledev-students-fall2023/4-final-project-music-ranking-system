import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import CommentDisplay from './CommentDisplay';
import Comment from './Comment';
import { useAuthContext } from "./AuthProvider.js";

function Post() {
  const currentuser = useAuthContext().user;
  const {songArtist, songTitle, username} = useParams()
  const [song, setSong] = useState([])
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${songArtist}/${songTitle}/${username}`)
      .then(response => {
        setSong(response.data.song)
        setPost(response.data.post);
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
      <div>
        <h4>{post.rating}/10</h4>
        <p>{post.review}</p>
      </div>
      <br/>
      <p><Link to='/other-user/ss'>ss</Link>  -- comment</p>
      <p><Link to='/other-user/test1'>test1</Link> -- comment</p>
      <br />
      <Comment />
    </div>
  )
}

export default Post;