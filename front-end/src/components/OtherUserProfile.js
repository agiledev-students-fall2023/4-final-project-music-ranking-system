import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProfileReview.css";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";

function OtherUserProfile() {
  const { userId } = useParams();
  const currentuser = useAuthContext().user;
  const [userData, setUser] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [followStatus, setFollowStatus] = useState();

  // const [userFollowers, setFollowers] = useState([]);
  // let [userFollowing, setFollowing] = useState([]);
  // const addFollowerToFollowers = (follower) => {
  //   const newFollowers = [follower, ...userFollowers];
  //   setFollowers(newFollowers);
  // };
  // let [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log("UserID: ", userId);
    axios
      .get(`http://localhost:3000/other-user/${userId}`)
      .then((res) => {
        console.log("Received data:", res.data);
        setUser(res.data);
        setUserActivity(res.data.activity);
        // setFollowers([...res.data.followers]);
        // console.log("followers", userFollowers);
        // setFollowing([...res.data.following]);
      })
      .catch((error) => {
        console.error("Error fetching other user data: ", error);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/follow", {
        params: {
          userId: userId,
          currentuser: currentuser,
        },
      })
      .then((res) => {
        setFollowStatus(res.data.status);
        console.log("HERE");
        console.log(res.data.status);
      });
  }, []);

  // useEffect(() => {
  //   if (userFollowers) {
  //     userFollowers.map((follower) => {
  //       if (follower._id === currentuser._id) {
  //         setIsFollowing(true);
  //       }
  //     });
  //   }
  // }, [currentuser, userFollowers]);

  // const handleFollowToggle = async () => {
  //   try {
  //     const response = axios.post(
  //       `http://localhost:3000/other-user/${userId}/${currentuser}`
  //     );
  //     setIsFollowing(response.data.isFollowing);
  //     console.log(isFollowing);
  //   } catch (error) {
  //     console.error("Error toggling follow:", error);
  //   }
  // };
  const addFollowerToFollowers = async () => {
    // console.log("HERE1");
    try {
      axios
        .post("http://localhost:3000/follow", {
          userId: userId,
          currentuser: currentuser,
          status: followStatus,
        })
        .then((res) => {
          console.log(res.data.status);
          setFollowStatus(res.data.status);
        });
    } catch (err) {}
  };

  if (!userData && !userActivity) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ProfileReview">
      <div className="profile">
        <h1>{userId}</h1>
      </div>

      <div className="FollowingDashboard">
        {/* <p>Followers: {userFollowers.length}</p>
        <p>Following: {userFollowing.length}</p> */}
        <button onClick={addFollowerToFollowers}>
          {followStatus ? <p>Unfollow</p> : <p>Follow</p>}
        </button>
      </div>

      <div className="activity">
        <h2>Activity</h2>
        {userActivity.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p>
              <Link
                to={`/post/${entry.song.artistName}/${entry.song.songName}/${userId}`}
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

export default OtherUserProfile;
