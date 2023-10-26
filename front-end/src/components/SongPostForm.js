import { useState } from 'react'
import axios from 'axios'

//TODO: maybe switch wording from review to post? in the codebase: review refers to the actual text, while post refers to user + rating + review
const SongPostForm = ({addReviewToList}) => {
  // create a state variable for each form field
  const [user, setUser] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')

  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/messages/save`, {
        user: user,
        rating: rating,
        review: review,
      })
      .then(response => {
        addReviewToList(response.data)
      })
      .catch(err => {
        console.log("Error posting data:", err)
      })

    // clear form
    setUser('')
    setRating('')
    setReview('')
  }

  return (
    <form className="SongReviewForm" onSubmit={submitForm}>
      <input type="number" name="rating" min="1" max="10" value={rating} onChange={e => setRating(e.target.value)}/>
      <label for="rating"> /10</label>
      <br />
      <textarea
        placeholder="Enter your review"
        rows="10"
        cols="30"
        onChange={e => setReview(e.target.value)}
        value={review}
      />
      <br />
      <input type="submit" disabled={!rating || !review} value="Post" />
    </form>
  )
}

export default SongPostForm