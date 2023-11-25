import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";


const SongPost = ({ post, songArtist, songTitle }) => {
  return (
    <div className="SongPost">
      <Link to={`/post/${songArtist}/${songTitle}/${post.username}`}>
        <p>{post.rating}/10</p>
        <p>
          {post.username} - {post.review}
        </p>
      </Link>
    </div>
  );
};

export default SongPost;
