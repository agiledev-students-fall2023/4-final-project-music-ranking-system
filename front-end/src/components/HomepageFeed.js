import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import { useAuthContext } from "./AuthProvider.js";

export default function HomepageFeed() {
  const [reviewObject, setReviewObject] = useState([]);
  const currentuser = useAuthContext().user;
  useEffect(() => {
    axios
      .post("http://localhost:3000/", { username: currentuser })
      .then((res) => {
        // console.log(res.data);
        setReviewObject(res.data);
        // console.log(reviewObject);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // if (reviewObject.length === 0) {
  //   return <h1>Followers have not been active recently</h1>;
  // }

  return reviewObject.map((item, index) => (
    <div>
      {/* <h1>{item.song.rating}</h1> */}
      <FeedComponent
        item={item.song}
        rating={item.rating}
        review={item.review}
        key={item._id}
      />
    </div>
  ));
}
