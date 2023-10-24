import {useState} from 'react';
import axios from 'axios';
import '../App.css';

function Song() {
  const [data, setData] = useState('hi')
  axios
    .get('https://my.api.mockaroo.com/animals.json?key=d9ddfc40')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
    })

  return (
    <div className="Song">
      <h1>Song Page</h1>
      <p>{data}</p>
    </div>
  );
}

export default Song;