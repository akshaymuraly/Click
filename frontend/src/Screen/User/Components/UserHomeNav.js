import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import "./UserHomeNav.css";
function UserHomeNav({ setQuery, Default }) {
  const [input, setInput] = useState("");
  return (
    <nav>
      <ul className="uh-nav-ul-container">
        <li>
          <Link
            to="userprofile"
            className="uh-nav-links"
            onClick={() => Default.setDefault(!Default.Default)}
          >
            <div className="uh-nav-prf-container">
              <CgProfile />
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <div className="uh-nav-search-container">
            <input
              type="text"
              className="uh-nav-search"
              placeholder="search..."
              onChange={(e) => {
                setInput(e.target.value);
                Default.setDefault(true);
              }}
            />
            <button
              className="uh-nav-search-btn"
              onClick={() => {
                setQuery(input);
                Default.setDefault(true);
              }}
            >
              <IoMdSearch className="uh-nav-search-btn-img" />
            </button>
          </div>
        </li>
        <li>Book</li>
      </ul>
    </nav>
  );
}

export default UserHomeNav;
