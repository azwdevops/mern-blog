import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/images/logo.png";

const Header = () => {
  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="" />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/profile">Will Smith</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <button className="nav-toggle-btn">
          <AiOutlineClose />
        </button>
      </div>
    </nav>
  );
};

export default Header;
