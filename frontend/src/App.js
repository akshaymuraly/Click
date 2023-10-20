import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screen/Home";
import SignIn from "./Screen/SignIn";
import UserHome from "./Screen/UserHome";
import SignUp from "./Screen/SignUp";
import AdminSignUp from "./Screen/Admin/Admin-signup";
import AdminSignIn from "./Screen/Admin/Admin-signin";
import AdminHome from "./Screen/Admin/Admin-homepage";
import Privateroute from "./Screen/Admin/Admin-privateroute";
import { Profile } from "./Screen/Admin/Components/Admin-Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserHome />} />

        {/* Admin routes */}
        <Route path="/adminsignup" element={<AdminSignUp />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route element={<Privateroute />}>
          <Route path="/adminhomepage" element={<AdminHome />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
