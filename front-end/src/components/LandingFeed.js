import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import "../css/LandingFeed.css"
import { useAuthContext } from "./AuthProvider.js";

export default function LandingFeed() {
  const authContext = useAuthContext()
  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {  
    console.log(authContext)
    
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
    <div className="LandingFeed">
      <h1>Welcome to Music Ranking App!</h1>
      {reviewObject.map((item, index) => (
        <FeedComponent item={item} key={index} />
      ))}
    </div>
  );
}
