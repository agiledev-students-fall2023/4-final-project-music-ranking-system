import React, { useState, useEffect} from 'react';
import '../css/Post.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

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
      <h2>{post.rating}/10</h2>
      <p>{post.review}</p>
      <br/>

      <p>user1 -- review</p>
      <br/>
      <p>user2 -- review</p>
      <br/>
      <form action='/add-comment' method='post' enctype='multipart/form-data'>
        <div class="input-group">
                <label for="comment">Add Comment: </label><br/>
                <textarea id="song-comment" name="song-comment" placeholder="Enter a comment" rows="10"></textarea>
            </div>
        <br/>
        <div class="button">
          <input type="submit" value="Enter"/>
        </div>

      </form>

    </div>
  );
}

export default Post;