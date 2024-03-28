import Loader from "@/components/Loader";
import PostItem from "@/components/PostItem";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorPosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await APIClient.get(`/posts/users/${userId}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts-container">
          {posts.map((singlePost) => (
            <PostItem
              key={singlePost._id}
              postId={singlePost._id}
              thumbnail={singlePost.thumbnail}
              category={singlePost.category}
              title={singlePost.title}
              description={singlePost.description}
              authorId={singlePost.creator}
              createdAt={singlePost.createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
