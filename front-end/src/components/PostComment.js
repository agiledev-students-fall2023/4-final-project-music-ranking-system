const PostComment = (comment) => {
  return (
    <div className="PostComment">
        <p>
          {comment.username} - {comment.comment}
        </p>
    </div>
  );
};

export default PostComment;