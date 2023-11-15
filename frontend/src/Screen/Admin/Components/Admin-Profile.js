import "../../../CSS/user-signin.css";
import Message from "../../../Components/Messages";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
axios.defaults.withCredentials = true;
// import { userActions } from "../../Store";

export function Profile() {
  const [message, setMessage] = useState(null);
  let axiosinstance = axios.create({ withCredentials: true });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    async function getdata() {
      try {
        const res = await axiosinstance.get("/admin/details");
        console.log(res.data.user);
        if (res.data.status) {
          console.log(res.data);
          setData(res.data.user);
          // setMessage(res.data.message);
          return;
        }
        // setMessage(res.data.message);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/admin/${data._id}`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res.data.status) {
        console.log(res.data);
        setMessage(res.data.message);
        return;
      }
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(message);
  function onchangehandler(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }
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
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={data.email}
          onChange={(e) => onchangehandler(e)}
        />
        <button type="submit">Update</button>
      </form>
      {message && <Message value={message} />}
    </div>
  );
}
