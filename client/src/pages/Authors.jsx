import Avatar1 from "@/images/avatar1.jpg";
import Avatar2 from "@/images/avatar2.jpg";
import Avatar3 from "@/images/avatar3.jpg";
import Avatar4 from "@/images/avatar4.jpg";
import Avatar5 from "@/images/avatar5.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const authorsData = [
  { id: 1, avatar: Avatar1, name: "First Person", posts: 3 },
  { id: 2, avatar: Avatar2, name: "Second Person", posts: 1 },
  { id: 3, avatar: Avatar3, name: "Third Person", posts: 0 },
  { id: 4, avatar: Avatar4, name: "Fourth Person", posts: 6 },
  { id: 5, avatar: Avatar5, name: "Fifth Person", posts: 2 },
];
const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <section className="authors">
      {authors?.length > 0 ? (
        <div className="container authors-container">
          {authors.map(({ id, avatar, name, posts }) => {
            return (
              <Link to={`/posts/users/${id}`} key={id} className="author">
                <div className="author-avatar">
                  <img src={avatar} alt={`Image of ${name}`} />
                </div>
                <div className="author-info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No authors found</h2>
      )}
    </section>
  );
};

export default Authors;
