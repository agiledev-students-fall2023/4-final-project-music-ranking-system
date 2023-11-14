import React from "react";
import { Link } from "react-router-dom";
import '../css/FeedComponent.css';


export default function FeedComponent({ item }) {
  return (
    <div className="FeedComponent">
          <div>
            <h1><Link to={`/song/${item.artist}/${item.song}`}>{item.artist} -- {item.song}</Link></h1>
            <img src={item.cover} alt="temp" />
            <h2>{item.rating}/10</h2>
            <p>{item.review}</p>
          </div>
    </div>
  );
}
