import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import CommentDisplay from './CommentDisplay';
import Comment from './Comment';
import { useAuthContext } from "./AuthProvider.js";

 

function Post() {
  const {username} = useParams();
  const currentuser = useAuthContext().user;
  const [posts, setPosts] = useState([]);
  const {songArtist, songTitle} = useParams()
  const [song, setSong] = useState([])
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${songArtist}/${songTitle}/${username}`)
      .then(response => {
        const postResponse = response.data
        setSong(postResponse.song)
        setPosts(postResponse.posts);
        console.log(postResponse.posts);
        console.log("Current", currentuser);
        console.log("Username:", username);
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle, username])


    const filteredPosts = posts.map(post => {
      if (post.username === username) {
        return (
          <div key="post">
            <h4>{post.rating}/10</h4>
            <p>{post.review}</p>
          </div>
        );
      }
      else {
        return null;
      }
    })
  
    if (!song) {
      return <div>Loading...</div>
    }
    if (currentuser == username) {
      return (
        <div className="Post">
          <h3><Link to={`/profile-review`}>{username}</Link>'s Review</h3>
          <h3>{song.artist} - {song.title}</h3>
          <img src={song.coverSrc} alt="album cover" />
          {filteredPosts}
          <br/>
          <p><Link to='/other-user/ss'>ss</Link>  -- comment</p>
          <p><Link to='/other-user/test1'>test1</Link> -- comment</p>
          <br />
          <Comment />
    
        </div>
      );
    }
    else {
      return (
        <div className="Post">
          <h3><Link to={`/other-user/${username}`}>{username}</Link>'s Review</h3>
          <h3>{song.artist} - {song.title}</h3>
          <img src={song.coverSrc} alt="album cover" />
          {filteredPosts}
          <br/>
          <p><Link to='/other-user/ss'>ss</Link>  -- comment</p>
          <p><Link to='/other-user/test1'>test1</Link> -- comment</p>
          <br />
          <Comment />
        </div>
      );
    }
  }
  
}

export default Post;