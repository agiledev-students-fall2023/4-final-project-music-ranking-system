import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProfileReview.css';
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";


function OtherUserProfile() {
  const { userId } = useParams();
  const currentuser = useAuthContext().user;
  console.log(currentuser);
  const [userData, setUser] = useState([]);
  const [userActivity, setActivity] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [following, setFollowing] = useState([]);
  let [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log("UserID: ", userId);
    axios
      .get(`http://localhost:3000/other-user/${userId}`)
      .then((res) => {
        console.log('Received data:', res.data);
        setUser(res.data);
        setActivity(res.data.activity);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      })
      .catch((error) =>{
        console.error("Error fetching other user data: ", error);
      });
      
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/other-user/${userId}/toggle-follow/${currentuser}`);
      setIsFollowing(response.data.isFollowing);
      console.log(isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  if (!userData && !userActivity) {
    return <div>Loading...</div>
  }
  return (
    <div className="ProfileReview">
      <div className="profile">
        <h1>{userId}</h1>
      </div>

      <div className="FollowingDashboard">
        <p>Followers: {followers = null ? 0 : followers.length}</p>
        <p>Following: {following = null ? 0 : following.length}</p>
        <button onClick={handleFollowToggle}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

       <div className="activity">
        <h2>Activity</h2>
        {userActivity.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p><Link to={`/post/${entry.artistName}/${entry.songName}/${userId}`}>{entry.artistName} -- {entry.songName}</Link></p>
            <p>{entry.rating}/10</p>
            <p>{entry.review}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OtherUserProfile;