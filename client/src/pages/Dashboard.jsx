import { useState } from "react";
import { DUMMY_POSTS } from "@/data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="dashboard">
      {posts.length > 0 ? (
        <div className="container dashboard-container">
          {posts.map((post) => (
            <article key={post.id} className="dashboard-post">
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={post.thumbnail} alt="" />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard-post-actions">
                <Link to={`/posts/${post.id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${post.id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <Link to={`/posts/${post.id}/delete`} className="btn sm danger">
                  Delete
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">You have no posts yet</h2>
      )}
    </section>
  );
};

export default Dashboard;
