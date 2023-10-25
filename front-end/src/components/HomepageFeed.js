import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomepageFeed() {
  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.mockaroo.com/api/ed7b7f40?count=1000&key=e62d6f80")
      .then((res) => {
        for (let i = 0; i < 5; i++) {
          const temp = {
            artist: res.data[i].artist,
            song: res.data[i].song,
            cover: res.data[i].cover,
            rating: res.data[i].rating,
            review: res.data[i].review,
          };
          setReviewObject((prevReviewObject) => [...prevReviewObject, temp]);
        }
      });
  }, []);

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

  return reviewObject.map((item, index) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
      }}
      key={index}
    >
      <div style={style}>
        <img style={{ width: 200, height: 200 }} src={item.cover} alt="temp" />
        <div style={{ margin: 10 }}>
          <h1>
            {item.artist} -- {item.song}
          </h1>
          <h2>{item.rating}/10</h2>
          <p>{item.review}</p>
        </div>
      </div>
    </div>
  ));
}
