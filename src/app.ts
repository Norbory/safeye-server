import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import config from "./config/config";

import reportsRoutes from "./routes/reports.routes";

// Interfaces

interface ServerToClientEvents {}

interface ClientToServerEvents {
  login: (username: string, company_id: string) => void;
  join: (room: string) => void;
}

interface SocketData {
  username: string;
  company_id: string;
}

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Socket.io
io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("login", (username, company_id) => {
    socket.join(company_id);
    socket.data.username = username;
    socket.data.company_id = company_id;
    console.log("User logged in", socket.data);
  });
  socket.on("join", (room) => {
    socket.join(room);
    console.log("User joined room", room);
  });
});

// Routes
app.use("/api", reportsRoutes);

export default server;
