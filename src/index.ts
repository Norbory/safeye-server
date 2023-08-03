import dotenv from "dotenv";
dotenv.config();

import server from "./app";
import "./database";
import config from "./config/config";

// Inicia el servidor
server.listen(config.PORT);
console.log(`Server running on port ${config.PORT}`);
