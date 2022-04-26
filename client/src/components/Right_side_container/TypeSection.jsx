import React, { useState, useContext } from "react";
import { UserContext } from "../../helper/Context";

export default function TypeSection() {
  const { sendMessageTo } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    sendMessageTo(message);
    setMessage("");
  };

  return (
    <div className="type_sec">
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="type_in"
        value={message}
      ></textarea>
      <button onClick={sendMessage} className="press_btn">
        ^^
      </button>
    </div>
  );
}
