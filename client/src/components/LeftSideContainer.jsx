import React, { useContext } from "react";
import Contacts from "./Left_side_container/Contacts";
import Profile from "./Left_side_container/Profile";
import { UserContext } from "../helper/Context";

export default function LeftSideContainer() {
  const { users, username } = useContext(UserContext);

  const filteredUsers = Object.keys(users).filter((user) => user !== username);
  const ids = Object.values(users);
  console.log(`${filteredUsers} filtered users for contact`);

  return (
    <section className="left_side_container">
      <Profile />
      <span className="both contact_tag">Contacts:</span>
      <Contacts users={filteredUsers} key={ids} />
    </section>
  );
}
