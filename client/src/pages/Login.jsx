import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import APIClient from "@/utils/APIClient";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await APIClient.post("/users/login", userData)
      .then((res) => {
        setCurrentUser(res.data);
        navigate("/");
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login-form" onSubmit={handleSubmit}>
          {error && <p className="form-error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Register</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
