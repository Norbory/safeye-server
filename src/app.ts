import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import reportsRoutes from "./routes/reports.routes";
import authRoutes from "./routes/auth.routes";

// Interfaces
interface Report {
  company_id: string;
  place: string;
  epp: string;
  time: Date;
}

interface ServerToClientEvents {
  sendReport: (report: Report) => void;
}

interface ClientToServerEvents {
  login: (username: string, company_id: string) => void;
  join: (room: string) => void;
  incident: (report: Report) => void;
}

interface SocketData {
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
  socket.on("login", (company_id) => {
    socket.join(company_id);
    socket.data.company_id = company_id;
    console.log("User logged in room: ", socket.data.company_id);
  });
  socket.on("join", (room) => {
    socket.join(room);
    console.log("User joined room", room);
  });
  socket.on("incident", (report) => {
    console.log("New incident", report);
    console.log("Sending incident to", socket.data.company_id);
    io.to(socket.data.company_id).emit("sendReport", report);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Routes
app.use("/api", reportsRoutes);
app.use("/api", authRoutes);

export default server;
