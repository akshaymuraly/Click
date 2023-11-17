import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screen/Home";
import SignIn from "./Screen/SignIn";
import SignUp from "./Screen/SignUp";
import AdminSignUp from "./Screen/Admin/Admin-signup";
import AdminSignIn from "./Screen/Admin/Admin-signin";
import AdminHome from "./Screen/Admin/Admin-homepage";
import Privateroute from "./Screen/Admin/Admin-privateroute";
import { Profile } from "./Screen/Admin/Components/Admin-Profile";
import DoctorsList from "./Screen/Admin/Components/Admin-DoctorsListTable";
import DoctorBooking from "./Screen/DoctorBooking";
import RegistrationForm from "./Components/RegistrationForm";
import UserSignUp from "./Screen/User/UserSignUp";
import UserSignIn from "./Screen/User/UserSignIn";
import UserHome from "./Screen/User/UserHome";
import UserHomeProfile from "./Screen/User/Components/UserHomeProfile";
import UserHomeSearch from "./Screen/User/Components/UserHomeSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bookdoctor/:doctorId" element={<DoctorBooking />} />

        {/* Admin routes */}
        <Route path="/adminsignup" element={<AdminSignUp />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route element={<Privateroute />}>
          <Route path="/adminhomepage" element={<AdminHome />}>
            <Route path="profile" element={<Profile />} />
            <Route path="doctors" element={<DoctorsList />} />
          </Route>
        </Route>

        {/* User routes */}
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/usersignin" element={<UserSignIn />} />
        <Route path="/userhome" element={<UserHome />}>
          <Route path="userprofile" element={<UserHomeProfile />} />
          <Route path="search" element={<UserHomeSearch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
