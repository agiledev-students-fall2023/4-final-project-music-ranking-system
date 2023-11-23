import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/Song.css';
import SongPostForm from './SongPostForm.js';
import SongPost from './SongPost.js';

//TODO: consider removing SongPostFrom once submit review? that way user can only submit once instead of multiple times
function Song() {
  const {songArtist, songTitle} = useParams()
  const [song, setSong] = useState([])
  const [posts, setPosts] = useState([])
  const addPostToList = post => {
    const newPosts = [post, ...posts] 
    setPosts(newPosts) 
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/song/${songArtist}/${songTitle}`)
      .then(response => {
        const song = response.data
        setSong(song)
        setPosts(song.posts)
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songArtist, songTitle])

  return (
    <div className="Song">
      <h2>{song.artist} - {song.title}</h2>
        <img src={song.coverSrc} alt="album cover" />
        {song.rating && <p>{song.rating}/10</p>}
        <p>{song.numReviews} reviews</p>
      <h3>Review:</h3>
        <SongPostForm addPostToList={addPostToList} songArtist ={songArtist} songTitle = {songTitle}/>
      <h3>Other reviews:</h3>
        {posts.map((post, i) => (
          <SongPost key={i} post={post} songArtist={songArtist} songTitle={songTitle}/>
        ))}
    </div>
  );
}

export default Song;