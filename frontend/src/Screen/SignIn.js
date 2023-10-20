import "../CSS/user-signin.css";
import Message from "../Components/Messages";
import { Link } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { useState, useEffect } from "react";
import axios from "axios";

function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onchangehandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  console.log(data);
  return (
    <div className="signinpage">
      <form action="">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={data.email}
          onChange={(e) => onchangehandler(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(e) => onchangehandler(e)}
        />
        <button type="submit">Login</button>
        <span>Not registered yet? </span>
        <Link className="signinpage-link" to={"/signup"}>
          Signup <SiGnuprivacyguard />
        </Link>
      </form>
      <Message />
    </div>
  );
}

export default SignIn;
