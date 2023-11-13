import React from 'react';
import '../App.css';
import '../css/Title.css';
import { Link } from "react-router-dom";


function Title() {
  return (
    <div className="title">
        <Link to="/"><h1>🎵 Music Ranking System 🎵</h1></Link>
    </div>
  );
}

export default Title;