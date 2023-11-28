import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";

const PostComment = ({comment}) => {
    const currentuser = useAuthContext().user;
    return (
        <div className="PostComment">
            {comment.username == currentuser? 
                <p><Link to={`/profile-review`}>{comment.username}</Link> - {comment.comment}</p> 
                :
                <p><Link to={`/other-user/${comment.username}`}>{comment.username}</Link> - {comment.comment}</p> 
            }
        </div>
    );
};

export default PostComment;