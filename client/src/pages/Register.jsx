import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register-form">
          <p className="form-error-message">This is an error message</p>
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            value={userData.confirm_password}
            onChange={handleChange}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
