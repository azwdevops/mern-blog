import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/images/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(
    window.innerWidth > 800 ? true : false
  );

  const { currentUser } = useContext(AuthContext);

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
        {currentUser?.id && isNavOpen && (
          <ul className="nav-menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavbar}>
                {currentUser?.name}
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
        {!currentUser?.id && isNavOpen && (
          <ul className="nav-menu">
            <li>
              <Link to="/authors" onClick={closeNavbar}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavbar}>
                Login
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
