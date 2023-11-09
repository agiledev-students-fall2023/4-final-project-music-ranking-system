import { Link } from "react-router-dom";

// TODO: change /post/$title to real post link
const SongPost = ({ post, title }) => {
  return (
    <>
      <article className="SongPost-article">
        <Link to={`/post/${title}`}>
          <p>{post.rating}/10</p>
          <p>
            {post.user} - {post.review}
          </p>
        </Link>
      </article>
    </>
  );
};

export default SongPost;
