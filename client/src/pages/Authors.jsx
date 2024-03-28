import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      await APIClient.get(`/users`)
        .then((res) => {
          setAuthors(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAuthors();
  }, []);

  return (
    <section className="authors">
      {authors?.length > 0 ? (
        <div className="container authors-container">
          {authors.map((singleAuthor) => {
            return (
              <Link
                to={`/posts/users/${singleAuthor?._id}`}
                key={singleAuthor._id}
                className="author"
              >
                <div className="author-avatar">
                  <img
                    src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${
                      singleAuthor.avatar
                    }`}
                    alt={`Image of ${singleAuthor.name}`}
                  />
                </div>
                <div className="author-info">
                  <h4>{singleAuthor.name}</h4>
                  <p>{singleAuthor.osts}</p>
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
