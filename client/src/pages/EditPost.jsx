import {
  POST_CATEGORIES,
  REACT_QUILL_FORMATS,
  REACT_QUILL_MODULES,
} from "@/constants";
import { AuthContext } from "@/context/AuthContext";
import APIClient from "@/utils/APIClient";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.token;

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      await APIClient.get(`/posts/${postId}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCategory(res.data.category);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    await APIClient.patch(`/posts/${postId}`, postData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        return navigate("/");
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">select category</option>
            {POST_CATEGORIES.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <ReactQuill
            modules={REACT_QUILL_MODULES}
            formats={REACT_QUILL_FORMATS}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            name=""
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png,jpg, jpeg"
          />
          <button type="submit" className="btn primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
