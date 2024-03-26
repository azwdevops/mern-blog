import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postId,
  title,
  description,
  thumbnail,
  category,
  authorId,
}) => {
  const shortDescription =
    description.length > 100 ? description.substr(0, 100) + "..." : description;
  const postTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  return (
    <article className="post">
      <div className="post-thumbnail">
        <img src={thumbnail} alt={postTitle} />
      </div>
      <div className="post-content">
        <Link to={`/posts/${postId}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post-footer">
          <PostAuthor authorId={authorId} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
