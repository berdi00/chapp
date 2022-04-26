import React, { useState, useEffect, useCallback } from "react";
import ChatContainer from "./components/ChatContainer";
import Header from "./components/Header";
import io from "socket.io-client";
// import Login from "./components/Login";
import { UserContext } from "./helper/Context";

import audio from "./sound/Vine.mp3";
import Auth from "./components/Authentication/Auth";

const socket = io.connect("http://localhost:3002");

// Helper function

const sortNames = (user1, user2) => {
  const usersArray = [user1, user2];
  const sorted = usersArray.sort();
  return sorted.join("-");
};

function App() {
  const [sound, setSound] = useState(false);
  const [data, setData] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState({});

  // const loginHandler = (e) => {
  //   // Spreading New user to all other Users and logging in
  //   socket.emit("new_user", username);

  //   setLoggedIn(true);
  // };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(typeof user);
    if (user) {
      setUsername(user.username);
      socket.emit("new_user", username);
      setLoggedIn(true);
    }
  }, []);

  const selectHandler = useCallback((user) => {
    setReceiver(user);
  }, []);

  const sendMessageTo = (message) => {
    const conversingPeople = sortNames(receiver, username);

    const dataFromSender = {
      conversation: conversingPeople,
      sender: username,
      receiver,
      message: message,
      date: new Date().getHours() + ":" + new Date().getMinutes(),
      view: false,
    };

    socket.emit("send_message", dataFromSender);
    setData((prev) => [...prev, dataFromSender]);
  };

  useEffect(() => {
    /// get all connected Users
    socket.on("all_users", (users) => {
      console.log(users);
      setUsers(users);
    });

    /// get new messages
    socket.on("new_message", (data) => {
      setData((prevdata) => [...prevdata, data]);
      setSound(true);
      setTimeout(() => setSound(false), 1000);
    });
  }, []);

  useEffect(() => {
    const newData = data.map((user) => {
      if (user.sender === receiver) {
        return { ...user, view: true };
      } else {
        return { ...user };
      }
    });

    setData(newData);
  }, [selectHandler, receiver]);

  console.log(data);

  console.log(`receiver: ${receiver}`);
  const content = loggedIn ? (
    <ChatContainer />
  ) : (
    <Auth />
    // <Login
    //   onLogin={loginHandler}
    //   onChange={(e) => setUsername(e.target.value)}
    //   value={username}
    // />
  );

  return (
    <UserContext.Provider
      value={{
        username,
        loggedIn,
        users,
        receiver,
        data,
        selectHandler,
        sendMessageTo,
        sortNames,
      }}
    >
      {sound && <audio autoPlay src={audio} type="audio/mpeg"></audio>}
      <Header />
      {content}
    </UserContext.Provider>
  );
}

export default App;
