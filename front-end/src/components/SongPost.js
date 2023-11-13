import { Link } from "react-router-dom";

// TODO: change /post/$title to real post link
const SongPost = ({ post, title }) => {
  return (
    <div className="SongPost">
      <Link to={`/post/${title}`}>
        <p>{post.rating}/10</p>
        <p>
          {post.user} - {post.review}
        </p>
      </Link>
    </div>
  );
};

export default SongPost;
