import express from "express";
import http from "http";

import { Server } from "socket.io";

import { setSocketServer } from "./socketManager.js";

import productsRouter from "./routes/products.js";

import cartsRouter from "./routes/carts.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

const httpServer = http.createServer(app);

const io = new Server(
  httpServer,

  {
    cors: {
      origin: "http://localhost:5173",
    },
  },
);

setSocketServer(io);

io.on(
  "connection",

  (socket) => {
    console.log("Cliente conectado");
  },
);

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
