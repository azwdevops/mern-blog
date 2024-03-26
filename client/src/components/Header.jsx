import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/images/logo.png";
import { useState } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(
    window.innerWidth > 800 ? true : false
  );

  const closeNavbar = () => {
    if (window.innerWidth < 800) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(true);
    }
  };
  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeNavbar}>
          <img src={logo} alt="" />
        </Link>
        {isNavOpen && (
          <ul className="nav-menu">
            <li>
              <Link to="/profile/dzdvvx" onClick={closeNavbar}>
                Will Smith
              </Link>
            </li>
            <li>
              <Link to="/create-post" onClick={closeNavbar}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavbar}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavbar}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav-toggle-btn"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
