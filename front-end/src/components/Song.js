import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/Song.css'
import SongPostForm from './SongPostForm.js';
import SongPost from './SongPost.js';

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
        <p>{song.rating}/10</p><p/>
        <p>{song.numReviews} reviews</p>
      <h2>Review:</h2>
        <SongPostForm addPostToList={addPostToList} songArtist ={songArtist} songTitle = {songTitle}/>
      <h2>Other reviews:</h2>
        {posts.map((post, i) => (
          <SongPost key={i} post={post} title={song.title}/>
        ))}
    </div>
  );
}

export default Song;