"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
require("./database");
const config_1 = __importDefault(require("./config/config"));
// Inicia el servidor
app_1.default.listen(config_1.default.PORT);
console.log(`Server running on port ${config_1.default.PORT}`);
//# sourceMappingURL=index.js.map