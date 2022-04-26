import React, { useContext } from "react";
import { UserContext } from "../../helper/Context";

export default function Profile() {
  const { username } = useContext(UserContext);

  return (
    <div className="profile_sec">
      <h2 className="profile_name">{username}</h2>
    </div>
  );
}
