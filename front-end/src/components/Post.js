import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import CommentDisplay from './CommentDisplay';
 

function Post() {
  const { postId } = useParams(); // "1"
  const [post, setPost] = useState([]);
  const {songArtist, songTitle} = useParams()
  const [song, setSong] = useState([])

  useEffect(() => {
    console.log("PostId: ", postId);
    axios
      .get(`http://localhost:3000/post/${postId}`)
      .then((res) => {
        console.log('Received data:', res.data);
        setPost(res.data);
      })
      .catch((error) =>{
        console.error("Error fetching post: ", error);
      });
      
  }, [postId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${songArtist}/${songTitle}`)
      .then(response => {
        const song = response.data
        setSong(song)
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle])

  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div className="Post">
      <h3><Link to='/other-user/user'>user</Link>'s Review</h3>
      <h3>{song.artist} -- {song.title}</h3>
      <img src={song.coverSrc} alt="temp" />
      <h4>{song.rating}/10</h4>
      <p>{song.review}</p>
      <br/>
      <p><Link to='/other-user/user1'>user1</Link>  -- comment</p>
      <p><Link to='/other-user/user2'>user2</Link> -- comment</p>
      <br />
      <CommentDisplay />

    </div>
  );
}

export default Post;