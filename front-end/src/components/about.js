import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import '../css/About.css';
import Nav from "./Nav";

function About() {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  
  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="About">
        <h1>About Music Ranking System</h1>
        <p>Welcome to our music ranking system, where the power of your music experience lies in your hands. We've created a platform that's all about celebrating the art of music, sharing your opinions, and connecting with fellow music enthusiasts.</p>

        <p>With our music ranking system, you have the freedom to explore and rate songs from any album, regardless of genre or artist. Whether it's a classic rock album from the '70s, a contemporary pop sensation, or an underground indie gem, you can listen and rate to your heart's content.</p>

        <p>We believe that every music listener has a unique perspective, and our platform allows you to express it through detailed reviews. Share your thoughts, feelings, and insights on each song or the entire album. Your reviews help other users discover new perspectives and deepen their appreciation for music.</p>

        <p>At our music ranking system, we're committed to fostering a dynamic and inclusive community of music lovers. Join us today to dive deeper into the world of music, share your unique perspective, and connect with friends who share your passion. Your journey in the world of music has just become more exciting and interactive.</p>

        <h3>Start ranking, reviewing, and connecting today!</h3>
      </div>
      <Nav isLoggedIn={isLoggedIn} />
    </>
  );
}

export default About;