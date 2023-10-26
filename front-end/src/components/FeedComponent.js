import React from "react";
import { Link } from "react-router-dom";

export default function FeedComponent({ item }) {
  const style = {
    background: "lightgray",
    padding: "20px",
    border: "1px solid #ccc",
    display: "flex",
    alignitems: "center",
    borderRadius: "10px",
    margin: "10px",
    width: "1000px",
    height: "200px",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <div style={style}>
        <img style={{ width: 200, height: 200 }} src={item.cover} alt="temp" />
        <Link style={{ textDecoration: "none" }} to={`/post/${item.id}`}>
          <div style={{ margin: 10 }}>
            <h1>
              {item.artist} -- {item.song}
            </h1>
            <h2>{item.rating}/10</h2>
            <p>{item.review}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
