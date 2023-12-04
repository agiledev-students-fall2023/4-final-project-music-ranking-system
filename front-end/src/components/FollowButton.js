import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from "./AuthProvider.js";

const FollowForm = ({addFollowertoFollowers, userId, addFollowertoFollowing}) => {
    const [username, setUsername] = useState("");
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
          setUsername(res.data.user.username)
        })
        .catch(err => {
          console.log(
            "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
          )
          setIsLoggedIn(false) // update this state variable, so the component re-renders
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
  

    // create a state variable for each form field
    const [userFollower, setFollower] = useState(null)

    const clickFollow = e => {
        e.preventDefault() // prevent normal browser submit behavior

        // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
        axios
        .post(`http://localhost:3000/other-user/${userId}/${currentuser}/save`, {
            currentuser: currentuser,
            userId: userId,
        })
        .then(response => {
            addFollowertoFollowers(response.data)
        })
        .catch(err => {
            console.log("Error posting data:", err)
        })
    }

  return (
    <input type="submit" value="Follow" onClick={clickFollow}/>
  )
}

export default FollowForm