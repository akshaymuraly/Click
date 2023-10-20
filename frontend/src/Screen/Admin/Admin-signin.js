import "../../CSS/user-signin.css";
import Message from "../../Components/Messages";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";

function AdminSignIn() {
  const [message, setMessage] = useState(null);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.startloading());
      const res = await axios.post(
        "http://127.0.0.1:5000/admin/signin",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      dispatch(userActions.stoploading());
      if (res.data.status) {
        dispatch(userActions.login());
        navigate("/adminhomepage");
        return;
      }
      setMessage(res.data.message);
      console.log(res.data.status);
    } catch (err) {
      dispatch(userActions.stoploading());
      console.log(err);
    }
  };
  function onchangehandler(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }
  return (
    <div className="signinpage">
      <form onSubmit={onsubmithandler}>
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
        <button type="submit">{loading ? "loading..." : "Signin"}</button>
      </form>
      {message && <Message value={message} />}
    </div>
  );
}

export default AdminSignIn;
