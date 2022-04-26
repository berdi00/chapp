import { createContext } from "react";

export const UserContext = createContext({
  loggedIn: false,
  username: "",
  receiver: "",
  data: [],
  users: {},
  count: "",
  selectHandler: (user) => {},
  sendMessageTo: (message) => {},
  sortNames: (user1, user2) => {},
});
