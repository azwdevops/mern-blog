import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <section className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login-form">
          <p className="form-error-message">This is an error message</p>

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
