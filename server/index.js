const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);

    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
      }
    }
    io.emit("all_users", users);
  });

  socket.on("new_user", (username) => {
    console.log("Server: " + username);
    users[username] = socket.id;

    // we can tell every other

    io.emit("all_users", users);
  });

  socket.on("send_message", (data) => {
    console.log(data);

    const socketId = users[data.receiver];
    console.log(data.receiver);
    console.log(users);
    console.log(socketId);
    io.to(socketId).emit("new_message", data);
  });
});

server.listen(3002, () => {
  console.log("Server running");
});
