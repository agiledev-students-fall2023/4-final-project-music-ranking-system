import { Link } from "react-router-dom";

// TODO: change /post/$title to real post link
const SongPost = ({ post, songArtist, songTitle }) => {
  return (
    <div className="SongPost">
      <Link to={`/post/${songArtist}/${songTitle}`}>
        <p>{post.rating}/10</p>
        <p>
          {post.user} - {post.review}
        </p>
      </Link>
    </div>
  );
};

export default SongPost;
