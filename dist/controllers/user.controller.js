"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.singUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// Function to create a token
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, name: user.name, last: user.surname, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400, // 24 hours
    });
}
// Function to create a new user
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Please. Send your email and password" });
    }
    const user = yield user_1.default.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ msg: "The user already exists" });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.singUp = singUp;
// Function to sign in
const singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Please. Send your email and password" });
    }
    const user = yield user_1.default.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exists" });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (isMatch) {
        const token = createToken(user);
        res.setHeader("Access-Control-Expose-Headers", "auth-token");
        return res.status(200).header("auth-token", token).json({
            name: user.name,
            last: user.surname,
            email: user.email,
            company_id: user.company_id,
        }); // TODO: Cambiar la respuesta para que no se envie el password
    }
    return res
        .status(400)
        .json({ msg: "The username or password are incorrect" });
});
exports.singIn = singIn;
//# sourceMappingURL=user.controller.js.map