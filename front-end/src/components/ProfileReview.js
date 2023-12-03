import React from "react";
import "../css/ProfileReview.css";
import { useAuthContext } from "./AuthProvider.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const username = useAuthContext().user;
  const [activityObject, setActivityObject] = useState([]);
  let [userFollowers, setFollowers] = useState([]);
  let [userFollowing, setFollowing] = useState([]);
  const addFollowerToFollowers = follower => {
    const newFollowers = [follower, ...userFollowers]
    setFollowers(newFollowers)
  }
  const addFollowerToFollowing = follower => {
    const newFollowing = [follower, ...userFollowing]
    setFollowing(newFollowing)
  }
  let [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/myProfile/${username}`)
      .then((res) => {
        setActivityObject(res.data.activity);
        console.log(activityObject);
        setFollowers([...res.data.followers]);
        console.log("followers", userFollowers);
        setFollowing([...res.data.following]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [username]);

  return (
    <div className="ProfileReview">
      <div className="ProfileReviewHeader">
        <h1>{username}</h1>
        <p>
          <Link to="/settings">Settings</Link>
        </p>
      </div>
      <div className="FollowingDashboard">
        <p>Followers: <Link to={`/view-followers`}>{userFollowers.length}</Link></p>
        <p>Following: <Link to={`/view-following`}>{userFollowing.length}</Link></p>
      </div>
      <div className="activity">
        <h2>Activity</h2>
        {activityObject.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p>
              <Link
                to={`/post/${entry.song.artistName}/${entry.song.songName}/${username}`}
              >
                {entry.song.artistName} -- {entry.song.songName}
              </Link>
            </p>
            <p>{entry.rating}/10</p>
            <p>{entry.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
