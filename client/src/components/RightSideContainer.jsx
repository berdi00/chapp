import React from "react";
import MessageContainer from "./Right_side_container/MessageContainer";
import RoomEntries from "./Right_side_container/RoomEntries";
import TypeSection from "./Right_side_container/TypeSection";

export default function RightSideContainer() {
  return (
    <section className="right_side_container">
      <RoomEntries />
      <MessageContainer />
      <TypeSection />
    </section>
  );
}
