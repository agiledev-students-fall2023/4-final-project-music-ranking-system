import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import "../css/LandingFeed.css";
import Nav from "./Nav";

export default function LandingFeed() {
  const [username, setUsername] = useState("");
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage

  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        setResponse(res.data); // store the response data
        setUsername(res.data.user.username);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [reviewObject, setReviewObject] = useState([]);
  useEffect(() => {
    // if logged in, display homepage feed
    if (isLoggedIn) {
      axios
        .post("http://localhost:3000/", { username: username })
        .then((res) => {
          setReviewObject(res.data);
         // console.log(res.data) //ake out later
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
    // otherwise, display landing feed
    else {
      axios
        .get("http://localhost:3000/landingFeed/topSongs")
        .then((res) => {
          setReviewObject(res.data);
        //  console.log(res.data) //take out later
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [username, isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <div className="HomepageFeed">
          {reviewObject.map((item, index) => (
            <FeedComponent
              username={item.username}
              item={item.song}
              rating={item.rating}
              review={item.review}
              key={item._id}
            />
          ))}
        </div>
      ) : (
        <div className="LandingFeed">
          <h1>Welcome to Music Ranking App!</h1>
          {reviewObject.map((item, index) => (
            <FeedComponent
              item={item.song}
              rating={item.rating}
              review={item.review}
              key={item._id}
            />
          ))} 
        </div>
      )}
      <Nav isLoggedIn={isLoggedIn} />
    </>
  );
}
