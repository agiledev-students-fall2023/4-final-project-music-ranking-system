import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import FeedComponent from "./FeedComponent";


export default function LandingFeed() {
  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0")
      .then((res) => {
        // const data = res.data.slice(0, 2).map((item) => ({
        //   id: item.id,
        //   title: item.title,
        //   artist: item.artist,
        //   song: item.song,
        //   cover: item.cover,
        //   rating: item.rating,
        //   review: item.review,
        // }));
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
  )
}
