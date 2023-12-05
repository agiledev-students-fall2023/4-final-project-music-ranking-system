import { useState, useEffect } from "react";
import axios from "axios";
import "../css/PostCommentForm.css";

const PostCommentForm = ({
  addCommentToList,
  songArtist,
  songTitle,
  username,
}) => {
  const [currentuser, setCurrentUser] = useState("");
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
        setCurrentUser(res.data.user.username);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // create a state variable for each form field
  const [comment, setComment] = useState("");

  const submitForm = (e) => {
    e.preventDefault(); // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(
        `http://localhost:3000/post/${songArtist}/${songTitle}/${username}/save`,
        {
          username: currentuser,
          comment: comment,
        }
      )
      .then((response) => {
        addCommentToList(response.data);
      })
      .catch((err) => {
        console.log("Error posting data:", err);
      });

    // clear form
    setComment("");
  };

  return (
    <form className="PostCommentForm" onSubmit={submitForm}>
      <textarea
        placeholder="Enter your comment..."
        rows="5"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <br />
      <input type="submit" disabled={!comment} value="Post Comment" />
    </form>
  );
};

export default PostCommentForm;
