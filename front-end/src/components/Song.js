import {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/Song.css'
import SongPostForm from './SongPostForm.js';
import SongPost from './SongPost.js';


//TODO: learn how to make path specified by song title, something like /:artist/:title, then need to change anywhere Link is /song
//TODO: after starting backend, need to add axios.post
function Song() {
  const [song, setSong] = useState([])
  const [posts, setPosts] = useState([])
  const addPostToList = post => {
    const newPosts = [...posts, post] 
    setPosts(newPosts) 
  }

  useEffect(() => {
    // api: https://mockaroo.com/apis/79178
    // refdocs: https://knowledge.kitchen/content/courses/agile-development-and-devops/notes/react-intro/#fetch
    axios
      .get(`https://my.api.mockaroo.com/songs/123.json?key=70e1efa0`)
      .then(response => {
        const song = response.data
        setSong(song)
        setPosts([{"title": song.title, "user": song.exuser, "rating": song.exrating, "review": song.exreview}])
      })
      .catch(err => {
        console.log("Error fetching data:", err)
      })
  }, [])

  return (
    <div className="Song">
      <h2>{song.artist} - {song.title}</h2>
        <img src="https://picsum.photos/200" alt="album cover" />
        <p>{song.rating}/10</p><p/>
        <p>{song.numreviews} reviews</p>
      <h2>Review:</h2>
        <SongPostForm addPostToList={addPostToList} />
      <h2>Other reviews:</h2>
        {posts.map(post => (
          <SongPost key={post.user} post={post} />
        ))}
    </div>
  );
}

export default Song;