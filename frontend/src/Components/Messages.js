import "../CSS/message.css";
import { AiOutlineClose } from "react-icons/ai";
function Message({ value, setIsMessageVisible }) {
  return (
    <>
      {" "}
      <div className="message-success">
        {value}
        <button
          className="msg-cls-btn"
          onClick={() => setIsMessageVisible(false)}
        >
          <AiOutlineClose />
        </button>
      </div>
    </>
  );
}

export default Message;
