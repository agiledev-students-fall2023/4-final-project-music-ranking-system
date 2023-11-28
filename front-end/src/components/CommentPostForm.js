import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from "./AuthProvider.js";

const CommentPostForm = ({setShowForm, addCommentToList, songArtist, songTitle}) => {
  const username = useAuthContext().user
  // create a state variable for each form field
  const [comment, setComment] = useState('')

  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior
    console.log("username", username)
    console.log("comment", comment)


    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`http://localhost:3000/comment/${songArtist}/${songTitle}/${username}/save`, {
        username: username,
        comment: comment,
      })
      .then(response => {
        addCommentToList(response.data)
      })
      .catch(err => {
        console.log("Error posting data:", err)
      })

    // clear form
    setShowForm(false)
  }

  return (
    <form className="CommentForm" onSubmit={submitForm}>
      <label for="comment">Add Comment: </label>
          <textarea 
            id="song-comment" 
            value={comment} 
            name="song-comment" 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Enter a comment" 
            rows="10"
          />
        <div class="button">
          <input type="submit" disabled={!comment} value="Enter"/>
        </div>
    </form>
  )
}

export default CommentPostForm;

