import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import APIClient from "@/utils/APIClient";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      await APIClient.get(`/users/${authorId}`)
        .then((res) => {
          setAuthor(res.data);
        })
        .catch();
    };
    getAuthor();
  }, [authorId]);

  return (
    <Link to={`/posts/users/${authorId}`} className="post-author">
      <div className="post-author-avatar">
        <img
          src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${
            author?.avatar
          }`}
          alt=""
        />
      </div>
      <div className="post-author-details">
        <h5>By: {author?.name}</h5>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
