import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';

//TODO: look at 3-simple-mern-stack, maybe use similar format to messages?
  //started to change Song.js, still need to check difference in html, then Message.js and MessageForm.js
//TODO: learn how to make path specified by song title, something like /:artist/:title
//TODO: after starting backend, need to add axios.post
function Song() {
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const addReviewToList = review => {
    const newReviews = [...reviews, review] 
    setReviews(newReviews) 
  }

  useEffect(() => {
    // api: https://mockaroo.com/apis/79178
    // refdocs: https://knowledge.kitchen/content/courses/agile-development-and-devops/notes/react-intro/#fetch
    axios
      .get(`https://my.api.mockaroo.com/songs/1.json?key=70e1efa0`)
      .then(response => {
        const reviews = response.data.reviews
        setReviews(reviews)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
  }, [])

  return (
    <div className="Song">
      <p>ARTIST - TITLE</p>
      <img src="https://picsum.photos/200" alt="album cover" />
      <p>RATING/10</p><p/>
      <p>NUMREVIEWS reviews</p>
      <h2>Review:</h2>
        <form>
          <input type="number" name="rating" min="1" max="10" />
          <label for="rating"> /10</label>

          <br />
          <textarea name="message" rows="10" cols="30">
          My review is written here!
          </textarea>

          <br/>
          <input type="submit" value="Post" />
        </form>
      <h2>Other reviews:</h2>
        <p>EXRATING/10</p>
        <p>EXUSER - EXREVIEW</p>
    </div>

//     <>
//       <h1>Leave a message!</h1>

//       {feedback && <p className="MessageForm-feedback">{feedback}</p>}
//       {error && <p className="MessageForm-error">{error}</p>}

//       <MessageForm
//         setError={setError}
//         setFeedback={setFeedback}
//         addMessageToList={addMessageToList}
//       />

//       {error && <p className="Messages-error">{error}</p>}
//       {messages.map(message => (
//         <Message key={message._id} message={message} />
//       ))}
//     </>
  );
}

export default Song;