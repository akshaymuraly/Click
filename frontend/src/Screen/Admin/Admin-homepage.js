import { useState, useEffect } from "react";
import axios from "axios";
import { adminActions } from "../../Store";
import { useDispatch } from "react-redux";
import "../../CSS/Admin/Admin-Homepage.css";
import "../../CSS/Admin/Admin-Homepage-content.css";
import { CgProfile } from "react-icons/cg";
import { useNavigate, Link, Router } from "react-router-dom";
import { Profile } from "./Components/Admin-Profile";
import { Outlet } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
axios.defaults.withCredentials = true;

export default function AdminHome() {
  const [activeComponent, setActivecomponent] = useState(null);
  function renderComponent() {
    switch (activeComponent) {
      case "Profile":
        return <Profile />;
      default:
        return null;
    }
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onsubmithandler(e) {
    const res = await axios.get("/admin/logout", {
      withCredentials: true,
    });
    if (res.data.status) {
      dispatch(adminActions.adminLogout());
      navigate("/");
      return;
    }
    console.log(res.data.message);
  }
  return (
    <div>
      <section className="admin-homepage">
        <nav>
          <ul>
            <li>
              <a
                className="admin-homepage-button"
                onClick={() => navigate("profile")}
              >
                <CgProfile /> Profile
              </a>
            </li>
            <li>
              <a>Services</a>
            </li>
            <li>Requests</li>
            <li>List of users</li>
            <li>
              <a
                className="admin-homepage-button"
                onClick={() => navigate("doctors")}
              >
                List of doctors
              </a>
            </li>
            <li>
              <form onSubmit={() => onsubmithandler()}>
                <button className="admin-homepage-button" type="submit">
                  Signout
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </section>
      <div className="content-div">
        <Outlet />
      </div>
    </div>
  );
}
