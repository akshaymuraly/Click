import { Link } from "react-router-dom";
import "../CSS/navbar.css";
import clicklogo from "../img/clicklogo.svg";
import { ImHome } from "react-icons/im";
import "../CSS/drop-down-menu.css";
// import DropdownMenu from "./drodown-menu";

function Navbar() {
  return (
    <nav className="navbar">
      {/* <img src={clicklogo} alt="logo" /> */}
      <ul>
        <Link className="no-link-property" to="...">
          <li>
            <ImHome />
            Home
          </li>
        </Link>
        <Link className="no-link-property" to="/signup">
          <li>Signup</li>
        </Link>
        <Link className="no-link-property" to="/signin">
          <li>Signin</li>
        </Link>
        <Link className="no-link-property " to="/signin">
          <li>
            <div className="drop-down-menu">
              Others
              <ul>
                <Link className="no-link" to="/adminsignin">
                  <li>Admin Signin</li>
                </Link>
                <Link className="no-link" to="/adminsignup">
                  <li>Admin Signup</li>
                </Link>
                <Link className="no-link" to="/doctorsignin">
                  <li>Doctor Sigin</li>
                </Link>
                <Link className="no-link" to="/doctorsignup">
                  <li>Doctor Signup</li>
                </Link>
              </ul>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
