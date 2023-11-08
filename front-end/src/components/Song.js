import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/Song.css'
import SongPostForm from './SongPostForm.js';
import SongPost from './SongPost.js';


//TODO: change anywhere Link is /song
//TODO: after starting backend, need to add axios.post
function Song() {
  const {songId} = useParams()
  const [song, setSong] = useState([])
  const [posts, setPosts] = useState([])
  const addPostToList = post => {
    const newPosts = [post, ...posts] 
    setPosts(newPosts) 
  }

  useEffect(() => {
    // api: https://mockaroo.com/apis/79178
    // refdocs: https://knowledge.kitchen/content/courses/agile-development-and-devops/notes/react-intro/#fetch
    axios
      .get(`http://localhost:3000/song/${songId}`)
      .then(response => {
        console.log(songId)
        const song = response.data
        setSong(song)
        setPosts(song.posts)
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [songId])

  return (
    <div className="Song">
      <h2>{song.artist} - {song.title}</h2>
        <img src={song.coversrc} alt="album cover" />
        <p>{song.rating}/10</p><p/>
        <p>{song.numreviews} reviews</p>
      <h2>Review:</h2>
        <SongPostForm addPostToList={addPostToList} />
      <h2>Other reviews:</h2>
        {posts.map(post => (
          <SongPost key={post.user} post={post} title={song.title}/>
        ))}
    </div>
  );
}

export default Song;