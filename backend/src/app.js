import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import { Server } from "socket.io";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";

import { setSocketServer } from "./socketManager.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

await mongoose.connect(process.env.MONGO_URL);

console.log("Mongo connected");

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

setSocketServer(io);

io.on("connection", (socket) => {
  console.log("Cliente conectado");
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Express corriendo en puerto ${PORT}`);
});
