const app = require("express")();
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

// 1. setting up socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// 3. On receiving the request, if the request agrees, it connects with the client
io.on("connection", (socket) => {
  console.log(`socket is connected ${socket.id}`);

// 5. on listening the custom event "join_room", server connects to the room using room data sent by client
socket.on('join_room',(data)=>{
  // console.log('room info received',data);
  socket.join(data)
})

  // 7. When the custom event "send_message" emitted by the client reaches to server, it listens it and get the message
  socket.on("send_message", (data) => {
    console.log(data);

    // 8. server is sending a message to all the clients that join the room except that room member that sends the message by emitting an custom event named "reply" with the message it wants to send on the specific room .
    socket.to(data.room).emit("reply", data.message);
  });
});

httpServer.listen(8000, () => {
  console.log("server is running on port 8000");
});




/*---------------------------------------
-----------------------------------------
A simple socket.io server example without room
----------------------------------------
----------------------------------------
*/

// const app = require("express")();
// const httpServer = require("http").createServer(app);
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// 1. setting up socket.io server
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });
// 3. On receiving the request, if the request agrees, it connects with the client
// io.on("connection", (socket) => {
//   console.log(`socket is connected ${socket.id}`);

// 5. When the custom event "send_message" emitted by the client reaches to server, it listens it and get the message
// socket.on("send_message",(data)=>{
//   console.log(data)

//   6. server is sending a message to client by emitting an custom event named "reply" with the message it wants to send.
//   socket.emit("reply",'I received your message')
// })

// });

// httpServer.listen(8000, () => {
//   console.log("server is running on port 8000");
// });
