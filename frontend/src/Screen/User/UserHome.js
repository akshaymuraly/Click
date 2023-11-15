import { useState, useEffect } from "react";
import UserHomeNav from "./Components/UserHomeNav";
import { Outlet } from "react-router-dom";

function UserHome() {
  return (
    <>
      <UserHomeNav />
      <Outlet />
    </>
  );
}

export default UserHome;
