import "../CSS/Main-Navbar.css";
import DDM from "./Main-Navbar-DDMenu";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function MainNavbar() {
  const [mobile, setMobile] = useState(false);

  // Use an event listener to update the mobile state when the window is resized.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header className="nav-header">
        <div className="nav-logo">
          <span>Logo</span>
          <img src="" alt="" />
        </div>
        <nav className="nav-main">
          <button
            className="hamburger-button"
            onClick={() => setMobile(!mobile)}
          >
            {" "}
            <GiHamburgerMenu className="hamburger-symbol" />
          </button>
          <ul className={mobile ? "ul-mobile" : "nav-ul"}>
            <li>
              <Link to="..." className="link">
                <ImHome />
                Home
              </Link>
            </li>
            <li>
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/signin" className="link">
                Sign In
              </Link>
            </li>
            <li className="more">
              <Link className="link">More</Link>
              <DDM />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
