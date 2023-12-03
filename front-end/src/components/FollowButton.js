import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from "./AuthProvider.js";

const FollowForm = ({addFollowertoFollowers, userId, addFollowertoFollowing}) => {
    const currentuser = useAuthContext().user
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