import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import APIClient from "@/utils/APIClient";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.token;

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const removePost = async (e) => {
    setIsLoading(true);
    await APIClient.delete(`/posts/${postId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (location.pathname == `/myposts/${currentUser?.id}`) {
          navigate(`/myposts/${currentUser?.id}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Link
      className="btn sm danger"
      to={`/posts/${postId}/delete`}
      onClick={() => removePost(postId)}
    >
      Delete
    </Link>
  );
};

export default DeletePost;
