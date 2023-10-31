const { randomUUID } = require("crypto");
const http = require("http");
const { WebSocketServer } = require("ws");

const httpServer = http.createServer();

// 1. Setting up websocket server
const wsServer = new WebSocketServer({ server: httpServer });

// 3. On receiving a new connection
wsServer.on("connection", function (ws) {
  // received a new connection
  console.log("received a new connection");

  // 6. server receives the incoming input message in form of buffer and convert it into string
  ws.on("message", function (message) {
    console.log(message.toString());
  });

  // 7. sending message to client
  ws.send("I am a server");

  //   10. When client closed the connection, it shows the message 'disconnected'
  ws.on("close", function () {
    console.log("disconnected");
  });
});

const port = 8000;

httpServer.listen(port, () => {
  console.log(`Websocket server is listening on port ${port}`);
});
