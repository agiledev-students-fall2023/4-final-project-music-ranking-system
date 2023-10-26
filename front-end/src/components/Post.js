import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Comment from './Comment';
import CommentDisplay from './CommentDisplay';

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.mockaroo.com/api/ed7b7f40?count=1000&key=e62d6f80")
      .then((res) => {
        const foundPost = res.data.find((item) => item.id === parseInt(postId));
        if (foundPost) {
          setPost(foundPost);
        } else {
          console.error("Post not found.");
        }
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

      <p>user1 -- review</p>
      <p>user2 -- review</p>
      <br/>
      <CommentDisplay />

    </div>
  );
}

export default Post;