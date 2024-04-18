const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", function (socket) {
  console.log("A user connected");
  socket.on("chat-message", function (data) {
    io.emit("chat-message", data);
  });
  socket.on("disconneted", function () {
    console.log("User disconnected");
  });
});
const PORT = process.env.PORT || 5001;
server.listen(PORT, function () {
  console.log(`http://localhost:${PORT} `);
});
