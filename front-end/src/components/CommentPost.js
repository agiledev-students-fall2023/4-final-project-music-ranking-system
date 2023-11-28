import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";


const CommentPost = ({ comment, songArtist, songTitle }) => {
    const {currentuser} = useAuthContext().user;
    const username = comment.username;
    if (currentuser === username) {
        return (
            <div className="SongPost">
              <Link to={`/profile-review`}>
                <p>
                  {username} - {comment}
                </p>
              </Link>
            </div>
          );
    }
    else {
        return (
            <div className="SongPost">
              <Link to={`/other-user/${username}`}>
                <p>
                  {username} - {comment}
                </p>
              </Link>
            </div>
          );
    }
  
};

export default CommentPost;