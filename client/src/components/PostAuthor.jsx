import { Link } from "react-router-dom";
import Avatar from "@/images/avatar1.jpg";

const PostAuthor = ({ authorId }) => {
  return (
    <Link to={`/posts/users/${authorId}`} className="post-author">
      <div className="post-author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="post-author-details">
        <h5>By: Dev Zask</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
