// MessageWindow.js
import { AiOutlineClose } from "react-icons/ai";
import "../CSS/MessageWindow.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MessageWindow({ setMessageVisible }) {
  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   setIsVisible(messageVisible);
  // }, [messageVisible]);

  return (
    <>
      {/* {isVisible ? ( */}
      <div className="message-container">
        <p>
          You have to login to book!{" "}
          <span>
            <Link className="message-login" to="/usersignin">
              {" "}
              Login{" "}
            </Link>{" "}
            or{" "}
            <Link className="message-login" to="/usersignup">
              {" "}
              Signup{" "}
            </Link>{" "}
            if you don't have a account yet!
          </span>
        </p>
        <button
          className="message-close-btn"
          onClick={() => {
            // setIsVisible(false);
            setMessageVisible(false);
          }}
        >
          <AiOutlineClose className="msg-btn" />
        </button>
      </div>
      {/* ) : null} */}
    </>
  );
}
