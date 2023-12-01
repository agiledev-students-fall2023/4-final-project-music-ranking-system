import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/Song.css';
import SongPostForm from './SongPostForm.js';
import SongPost from './SongPost.js';

function Song() {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`) // debugging

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const username = response.username
  const {songArtist, songTitle} = useParams()
  const [song, setSong] = useState([])
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(true)
  const addPostToList = post => {
    const newPosts = [post, ...posts] 
    setPosts(newPosts) 
  }
  //fetch info about song
  useEffect(() => {
    axios
      .get(`http://localhost:3000/song/${songArtist}/${songTitle}`)
      .then(response => {
        const song = response.data
        setSong(song)
        setPosts([...song.posts])
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle])
  //check if username already posted review, if so remove post form
  useEffect(() => {
    console.log(posts)
    posts.map((post) => {
      if (post.username === username) {
        setShowForm(false)
      }
    })
  }, [posts])

  return (
    <div className="Song">
      <h2>{song.artist} - {song.title}</h2>
      <img src={song.coverSrc} alt="album cover" />
      <p>{song.rating}/10</p>
      {song.numReviews === 1? <p>{song.numReviews} review</p>:<p>{song.numReviews} reviews</p>}
      {isLoggedIn && showForm && 
        <>
          <h3>Review:</h3>
          <SongPostForm setShowForm={setShowForm} addPostToList={addPostToList} songArtist={songArtist} songTitle={songTitle} />
        </>
      }
      <h3>Other reviews:</h3>
        {posts.map((post, i) => (
          <SongPost key={i} post={post} songArtist={songArtist} songTitle={songTitle}/>
        ))}
    </div>
  );
}

export default Song;