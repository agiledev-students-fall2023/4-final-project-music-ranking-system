import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuthContext } from "./AuthProvider.js";
import '../css/Followers.css';

function ViewFollowers() {
    const userId = useAuthContext().user;
    const [userFollowers, setFollowers] = useState();
    
    useEffect(() => {
        axios
          .get(`http://localhost:3000/view-followers/${userId}`)
          .then(response => {
            setFollowers(response.data);
            console.log("followers", response.data);
          })
          .catch(err => {
            console.log("Error fetching data:", err)
          })
      }, [userId]);

      useEffect(() => {
        console.log("set followers", userFollowers);
      }, [userFollowers]);

    if (!userFollowers || userFollowers.length === 0) {
        return (
        <div className="profile">
            <h1><Link to={`/profile-review`}>{userId}</Link>'s Followers</h1>
            <div>You have no followers.</div>
        </div>
        )
    }
    return (
        <div className="ViewFollowers">
            <div className="profile">
                <h1><Link to={`/profile-review`}>{userId}</Link>'s Followers</h1>
            </div>

            <div className="followers">
                {userFollowers.map((entry, index) => (
                    <div key={index} className="follower-entry">
                        <p>
                            <Link
                                to={`/other-user/${entry.username}`}
                            >
                                {entry.username}
                            </Link>
                            <br/>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewFollowers;
