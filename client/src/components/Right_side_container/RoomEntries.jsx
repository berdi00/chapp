import React, { useContext } from "react";
import { UserContext } from "../../helper/Context";

export default function RoomEntries() {
  const { receiver } = useContext(UserContext);

  return (
    <div className="room_entries">
      <span className="both room_header">{receiver}</span>
    </div>
  );
}
