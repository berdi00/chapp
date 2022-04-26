import React, { useContext } from "react";
import { UserContext } from "../../helper/Context";

export default function Contacts({ users }) {
  const { selectHandler, receiver, data } = useContext(UserContext);

  return (
    <div className="contacts_sec">
      {users.map((user, key) => (
        <span
          key={key}
          onClick={() => selectHandler(user)}
          className={`both contact_name ${
            receiver === user ? "paintBack" : null
          }`}
        >
          {user}
          {receiver === user ? null : (
            <div className="notifications">
              <span className="both notNumber">
                {
                  data.filter(
                    (users) => users.sender === user && users.view === false
                  ).length
                }
              </span>
            </div>
          )}
        </span>
      ))}
    </div>
  );
}
