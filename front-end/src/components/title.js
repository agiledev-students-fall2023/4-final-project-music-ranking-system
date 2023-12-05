import React from 'react';
import '../App.css';
import '../css/Title.css';
import { Link } from "react-router-dom";


function Title() {
  return (
    <div className="title">
        <Link className="title-link" to="/"><h1>GlassTune! *ੈ✩‧₊˚</h1></Link>
        <h4>The Music Ranking System</h4>
    </div>
  );
}

export default Title;