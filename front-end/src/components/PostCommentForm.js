import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from "./AuthProvider.js";

const PostCommentForm = ({addCommentToList, songArtist, songTitle, username}) => {
    const currentuser = useAuthContext().user
    // create a state variable for each form field
    const [comment, setComment] = useState('')

    const submitForm = e => {
        e.preventDefault() // prevent normal browser submit behavior

        // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
        axios
        .post(`http://localhost:3000/post/${songArtist}/${songTitle}/${username}/save`, {
            username: currentuser,
            comment: comment
        })
        .then(response => {
            addCommentToList(response.data)
        })
        .catch(err => {
            console.log("Error posting data:", err)
        })

        // clear form
        setComment('')
    }

  return (
    <form className="PostCommentForm" onSubmit={submitForm}>
      <textarea
        placeholder="enter your comment..."
        rows="5"
        onChange={e => setComment(e.target.value)}
        value={comment}
      />
      <br />
      <input type="submit" disabled={!comment} value="Post Comment" />
    </form>
  )
}

export default PostCommentForm
