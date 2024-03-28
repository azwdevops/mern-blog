import { useContext, useEffect, useState } from "react";

import PostAuthor from "@/components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import DeletePost from "./DeletePost";
import Loader from "@/components/Loader";
import APIClient from "@/utils/APIClient";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await APIClient.get(`/posts/${postId}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [postId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail-header">
            <PostAuthor authorId={post?.creator} createdAt={post?.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="post-detail-buttons">
                <Link to={`/posts/${postId}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={postId} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail-thumbnail">
            <img
              src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${
                post?.thumbnail
              }`}
              alt=""
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
