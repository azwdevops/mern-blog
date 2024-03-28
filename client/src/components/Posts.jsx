import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader";
import APIClient from "@/utils/APIClient";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      await APIClient.get("/posts")
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    };
    fetchPosts();
  }, []);

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

export default Posts;
