import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';

//TODO: look at 3-simple-mern-stack, maybe use similar format to messages?
//TODO: learn how to make path specified by song title, something like /:artist/:title
//TODO: after starting backend, need to add axios.post
function Song() {
  const [data, setData] = useState('hi')
  useEffect(() => {
    axios
    .get('https://my.api.mockaroo.com/songs.json?key=70e1efa0')
    .then(response => {
      // setData(response.data)
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
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
  );
}

export default Song;