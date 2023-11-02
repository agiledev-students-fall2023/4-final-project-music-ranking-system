import { Link } from 'react-router-dom'


const SongPost = ({post}) => {
  console.log(post.user)
  return (
    <>
      <article className="SongPost-article">
        <Link to={`/post/${post.user}/${post.title}`}>
        <p>{post.rating}/10</p>
        <p>{post.user} - {post.review}</p>
        </Link>
      </article>
    </>
  )
}

export default SongPost