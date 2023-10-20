import "../CSS/user-signin.css";
import Message from "../Components/Messages";
import { useState, useEffect } from "react";
import axios from "axios";

function SignUp() {
  const [data, setData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    specialization: "",
    password: "",
  });
  const onsubmithandler = (e) => {
    e.preventDefault();
    try {
      const res = axios.post("", {
        name: data.name,
        contact: data.contact,
        email: data.email,
        address: data.address,
        specialization: data.specialization,
        password: data.password,
      });
    } catch (err) {
      console.log(err);
    }
  };
  function onchangehandler(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }
  console.log(data);
  return (
    <div className="signinpage">
      <form onSubmit={onsubmithandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={(e) => onchangehandler(e)}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          value={data.contact}
          onChange={(e) => onchangehandler(e)}
        />
        <label htmlFor="specialization">Specialization</label>
        <input
          type="text"
          id="specialization"
          value={data.specialization}
          onChange={(e) => onchangehandler(e)}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={data.address}
          onChange={(e) => onchangehandler(e)}
        />
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
        <button type="submit">Signup</button>
      </form>
      <Message />
    </div>
  );
}

export default SignUp;
