import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from "./AuthProvider.js";

const SongPostForm = ({setShowForm, addPostToList, songArtist, songTitle}) => {
  const username = useAuthContext().user
  // create a state variable for each form field
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')

  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior
    console.log("username", username)


    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`http://localhost:3000/song/${songArtist}/${songTitle}/save`, {
        user: username,
        rating: rating,
        review: review,
      })
      .then(response => {
        addPostToList(response.data)
      })
      .catch(err => {
        console.log("Error posting data:", err)
      })

    // clear form
    setShowForm(false)
  }

  return (
    <form className="SongReviewForm" onSubmit={submitForm}>
      <input type="number" name="rating" min="1" max="10" value={rating} onChange={e => setRating(e.target.value)}/>
      <label htmlFor="rating"> /10</label>
      <br />
      <textarea
        placeholder="enter your review..."
        rows="10"
        onChange={e => setReview(e.target.value)}
        value={review}
      />
      <br />
      <input type="submit" disabled={!rating || !review} value="Post" />
    </form>
  )
}

export default SongPostForm
