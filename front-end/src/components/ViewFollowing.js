import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuthContext } from "./AuthProvider.js";
import '../css/Following.css';


function ViewFollowing() {
    const userId = useAuthContext().user;
    const [userFollowing, setFollowing] = useState([]);

    useEffect(() => {
        axios
          .get(`http://localhost:3000/view-following/${userId}`)
          .then(response => {
            setFollowing(response.data)
            console.log("following", userFollowing);
          })
          .catch(err => {
            console.log("Error fetching data:", err)
          })
      }, [userId]);

    if (!userFollowing || userFollowing.length === 0) {
        return (
            <div className="profile">
                <h1><Link to={`/profile-review`}>{userId}</Link>'s Following</h1>
                <div>You are not following anyone.</div>
            </div>        
        )
    }
    else {
        return (
            <div className="ViewFollowing">
                <div className="profile">
                    <h1><Link to={`/profile-review`}>{userId}</Link>'s Following</h1>
                </div>
    
                <div className="following">
                    {userFollowing.map((entry, index) => (
                        <div key={index} className="following-entry">
                            <p>
                                <Link
                                    to={`/other-user/${entry.username}`}
                                >
                                    {entry.username}
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    
}

export default ViewFollowing;
