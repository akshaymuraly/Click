import "../CSS/RegistrationForm.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store";
import Message from "./Messages";

export default function RegistrationForm({ array }) {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loading);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    address: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.userStartLoading());
      const res = await axios.post("/user/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        dob: inputs.dob,
        address: inputs.address,
      });
      dispatch(userActions.userStopLoading());
      setMessage(res.data.message);
      setIsMessageVisible(true);
      console.log(res.data);
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
                      field === "password" || field === "email" ? field : "text"
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
          <Message value={message} setIsMessageVisible={setIsMessageVisible} />
        )}
      </form>
    </>
  );
}
