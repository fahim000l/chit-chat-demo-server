const express = require("express");
const app = express();
const cors = require("cors");
const http = require("https");
const { Server } = require("socket.io");

const port = process.env.PORT || 5000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chit-chat-demo.web.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user Connected :${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user logedIn with Id :${socket.id} in room:${data}`);
  });
  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log("Server is running on port :", port);
});
