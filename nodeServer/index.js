// const express = require("express");
// var app = express();
// var server = require("http").createServer(app);
// var io = require("socket.io");
// server.listen(app.get(8080));
options = {
  cors: true,
  origins: ["http://127.0.0.1:5347"],
};
const io = require("socket.io")(8080, options);
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (username) => {
    console.log("new-user", username);
    users[socket.id] = username;
    socket.broadcast.emit("user-joined", username);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      username: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
