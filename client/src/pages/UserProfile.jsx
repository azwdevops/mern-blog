import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import APIClient from "@/utils/APIClient";

const UserProfile = () => {
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    const fetchUser = async () => {
      setIsLoading(true);
      await APIClient.get(`/users/${currentUser.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setAvatar(res.data.avatar);
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchUser();
  }, [currentUser?.id, token]);

  const changeAvatarHandler = async (e) => {
    setIsAvatarTouched(false);
    const postData = new FormData();
    postData.set("avatar", avatar);
    await APIClient.post(`/users/change-avatar`, postData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setAvatar(res.data.avatar);
      })
      .catch((err) => {});
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = new FormData();
    userData.set("name", name);
    userData.set("email", email);
    userData.set("currentPassword", currentPassword);
    userData.set("newPassword", newPassword);
    userData.set("confirmNewPassword", confirmNewPassword);
    await APIClient.patch(`/users/edit-user`, userData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // log user out so that they can login with the new details
        navigate("/logout");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="container profile-container">
      <Link to={`/myposts/${currentUser.id}`} className="btn">
        My Posts
      </Link>
      <div className="profile-details">
        <div className="avatar-wrapper">
          <div className="profile-avatar">
            <img
              src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${avatar}`}
              alt=""
            />
          </div>
          {/* form to update avatar */}
          <form className="avatar-form">
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="png, jpg, jpeg"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <label htmlFor="avatar">
              <FaEdit onClick={() => setIsAvatarTouched(true)} />
            </label>
          </form>
          {isAvatarTouched && (
            <button
              className="profile-avatar-btn"
              onClick={changeAvatarHandler}
            >
              <FaCheck />
            </button>
          )}
        </div>
        <h1>{currentUser?.name}</h1>

        {/* form to update user details */}
        <form className="form profile-form" onSubmit={updateUserDetails}>
          {error && <p className="form-error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button type="submit" className="btn primary">
            Update Details
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
