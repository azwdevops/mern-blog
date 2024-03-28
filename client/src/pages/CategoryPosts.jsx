import PostItem from "@/components/PostItem";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await APIClient.get(`/posts/categories/${category}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPosts();
  }, [category]);

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

export default CategoryPosts;
