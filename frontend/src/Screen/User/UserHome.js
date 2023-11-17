import { useState, useEffect } from "react";
import UserHomeNav from "./Components/UserHomeNav";
import { Outlet, useNavigate } from "react-router-dom";
import UserHomeSearch from "./Components/UserHomeSearch";
import axios from "axios";

function UserHome() {
  const [Default, setDefault] = useState(true);
  const [query, setQuery] = useState("");
  return (
    <>
      <UserHomeNav setQuery={setQuery} Default={{ setDefault, Default }} />
      {Default ? <UserHomeSearch query={query} /> : <Outlet />}
    </>
  );
}

export default UserHome;
