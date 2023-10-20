import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function Privateroute() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/adminsignin" />;
}
