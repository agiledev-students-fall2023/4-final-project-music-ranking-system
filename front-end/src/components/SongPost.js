import { Link } from 'react-router-dom'


const SongPost = (post) => {
  console.log(post)
  return (
    <>
      <article className="SongPost-article">
        <h2>
          {/* <Link to={`/post/${post.user}/${post.title}`}>{post.title}</Link> */}
        </h2>
        <p>{post.review}</p>
      </article>
    </>
  )
}

export default SongPost