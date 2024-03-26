import PostItem from "@/components/PostItem";
import { DUMMY_POSTS } from "@/data";
import { useState } from "react";

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts-container">
          {posts.map(
            ({ id, thumbnail, category, title, description, authorId }) => (
              <PostItem
                key={id}
                postId={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorId={authorId}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
