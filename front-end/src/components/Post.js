import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import CommentDisplay from './CommentDisplay';
 

function Post() {
  const { postId } = useParams(); // "1"
  const [post, setPost] = useState([]);

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

  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div className="Post">
      <h3>user's Review</h3>
      <h3>{post.artist} -- {post.song}</h3>
      <img style={{ width: 200, height: 200 }} src={post.cover} alt="temp" />
      <h4>{post.rating}/10</h4>
      <p>{post.review}</p>
      <br/>

      <p><Link to='/other-user/user1'>user1</Link>  -- review</p>
      <p><Link to='/other-user/user2'>user2</Link> -- review</p>
      <br/>
      <CommentDisplay />

    </div>
  );
}

export default Post;