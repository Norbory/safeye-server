"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://localhost/test",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    },
};
//# sourceMappingURL=config.js.map