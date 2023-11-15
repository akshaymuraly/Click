import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../Store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Message from "../../Components/Messages";

const AdminSignIn = () => {
  const array = ["email", "password"];
  const navigate = useNavigate();
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loading);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.userStartLoading());
      const res = await axios.post("/user/signin", {
        email: inputs.email,
        password: inputs.password,
      });
      dispatch(userActions.userStopLoading());
      setMessage(res.data.message);
      setIsMessageVisible(true);
      if (res.data.status) {
        dispatch(userActions.userLogin());
        navigate("/userhome");
        return;
      }
    } catch (err) {
      console.log(err);
      dispatch(userActions.userStopLoading());
    }
  };
  const onchangehandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "linear-gradient(198deg, rgba(34,86,195,1) 8%, rgba(45,253,233,1) 68%)",
        }}
      >
        <form className="form-container" onSubmit={onSubmitHandler}>
          <table className="form-table">
            <tbody>
              {array.map((field, index) => (
                <tr key={index}>
                  <td>
                    <label htmlFor={`${field}`}>{field} :</label>
                  </td>
                  <td>
                    <input
                      className="form-input"
                      name={field}
                      type={
                        field === "password" || field === "email"
                          ? field
                          : "text"
                      }
                      onChange={(e) => onchangehandler(e)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className={"form-bt-submit"}>
            {isLoading ? "loading..." : "Submit"}
          </button>
          {isMessageVisible && (
            <Message
              value={message}
              setIsMessageVisible={setIsMessageVisible}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default AdminSignIn;
