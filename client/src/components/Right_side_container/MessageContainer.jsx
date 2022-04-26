import React, { useContext, useState } from "react";
import { UserContext } from "../../helper/Context";

export default function MessageContainer() {
  const { sortNames, receiver, username, data } = useContext(UserContext);

  const conversing = sortNames(receiver, username);

  const filteredConversation = data.filter(
    (data) => data.conversation === conversing
  );

  const reversed = filteredConversation.reverse();

  console.log(filteredConversation.length);
  return (
    <div className="messages_container">
      {reversed.length !== 0
        ? reversed.map((convers, index) => (
            <div
              className={`message_body ${
                convers.sender === username ? "you" : "other"
              }`}
              key={index + 1}
            >
              <div className="message_wrapper" key={index + 2}>
                <p key={index + 3} className="message">
                  {convers.message}
                </p>
              </div>
              <p key={index + 4} className="date">
                {convers.date}
              </p>
            </div>
          ))
        : null}
    </div>
  );
}
