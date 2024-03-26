import {
  POST_CATEGORIES,
  REACT_QUILL_FORMATS,
  REACT_QUILL_MODULES,
} from "@/constants";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        <p className="form-error-message">This is an error message</p>
        <form className="form create-post-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((category) => (
              <option value="" key={category}>
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
