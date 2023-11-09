import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";

export default function LandingFeed() {
  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/landingFeed/retrieve")
      .then((res) => {
        setReviewObject(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <h1>Welcome to Music Ranking App!</h1>
      {reviewObject.map((item, index) => (
        <FeedComponent item={item} key={index} />
      ))}
    </>
  );
}
