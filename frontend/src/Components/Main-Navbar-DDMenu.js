import "../CSS/Main-Navbar-DDMenu.css";
import { Link } from "react-router-dom";

export default function DDM() {
  return (
    <>
      <div className="drop-down-menu">
        <ul>
          <li>
            <Link to="/adminsignup" className="link">
              Admin Signup
            </Link>
          </li>
          <li>
            <Link to="/adminsignin" className="link">
              Admin In
            </Link>
          </li>
          <li>
            <Link to="/doctorsignup" className="link">
              Doctor Signup
            </Link>
          </li>
          <li>
            <Link to="/doctorsignin" className="link">
              Doctor Signin
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
