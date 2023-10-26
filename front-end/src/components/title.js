import React from 'react';
import '../App.css';
import '../css/Title.css';

function Title() {
  return (
    <div className="title">
        <img id="logo" src={process.env.PUBLIC_URL + '/notes.png'} alt="music notes"/>
        <h1>Music Ranking System</h1>
    </div>
  );
}

export default Title;