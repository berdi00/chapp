import React from "react";
import LeftSideContainer from "./LeftSideContainer";
import RightSideContainer from "./RightSideContainer";

export default function ChatContainer() {
  return (
    <div className="chat_container">
      <LeftSideContainer />
      <RightSideContainer />
    </div>
  );
}
