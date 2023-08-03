"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const reports_routes_1 = __importDefault(require("./routes/reports.routes"));
// Initializations
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});
// Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
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
app.use("/api", reports_routes_1.default);
exports.default = server;
//# sourceMappingURL=app.js.map