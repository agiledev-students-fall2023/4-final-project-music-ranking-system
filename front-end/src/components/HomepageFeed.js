import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";

export default function HomepageFeed() {
  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setReviewObject(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return reviewObject.map((item, index) => (
    <FeedComponent item={item} key={index} />
  ));
}