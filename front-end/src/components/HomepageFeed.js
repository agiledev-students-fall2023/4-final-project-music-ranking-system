import React from "react";
import { useState, useEffect } from "react";
import tempImage from "../logo.svg";

export default function HomepageFeed() {
  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {
    const temp = {
      title: "HelloWord",
      cover: tempImage,
      review: "This is review",
    };
    console.log("HERE");
    setReviewObject((prevReviewObject) => [...prevReviewObject, temp]);
  }, []);

  const style = {
    background: "lightgray",
    padding: "20px",
    border: "1px solid #ccc",
    display: "flex",
    alignitems: "center",
    borderRadius: "10px",
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
        <div>
          <h1>{item.title}</h1>
          <p>{item.review}</p>
        </div>
      </div>
    </div>
  ));
}
