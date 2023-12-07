import { Link } from "react-router-dom";
import "../css/SongPost.css";

const SongPost = ({ post, songArtist, songTitle }) => {
  return (
    <div className="SongPost">
      <Link to={`/post/${songArtist}/${songTitle}/${post.username}`}>
        <p>{post.username}</p>
        <p>{post.rating}/10</p>
        <p>{post.review}</p>
      </Link>
    </div>
  );
};

export default SongPost;
