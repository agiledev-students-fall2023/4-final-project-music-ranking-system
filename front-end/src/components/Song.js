import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/Song.css';
import SongPostForm from './SongPostForm.js';
import SongPost from './SongPost.js';
import { useAuthContext } from "./AuthProvider.js";

function Song() {
  console.log("useAuthContext", useAuthContext())
  const username = useAuthContext().response.username;
  const isLoggedIn = useAuthContext().isLoggedIn;
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