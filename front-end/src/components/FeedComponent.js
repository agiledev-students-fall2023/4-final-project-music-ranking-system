import React from "react";
import { Link } from "react-router-dom";
import "../css/FeedComponent.css";

export default function FeedComponent({ username, item, rating, review }) {
  return (
    <div className="FeedComponent">
      <div>
        <h1>
          <Link to={`/song/${item.artistName}/${item.songName}`}>
            {item.artistName} - {item.songName}
          </Link>
        </h1>
        <h1>({item.artistName})</h1>
        <img src={item.albumCover} alt="temp" />
        {username && <h1>Posted By: {username}</h1>}
        {rating && <h2>{rating}/10</h2>}
        {review && <p>{review}</p>}
      </div>
    </div>
  );
}
