import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function Privateroute() {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/adminsignin" />;
}
