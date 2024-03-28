"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const pasteleria_json_1 = __importDefault(require("../db/pasteleria.json"));
const validateAuth = (req, res, next) => {
    const token = req.get("Authorization");
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    const exists = pasteleria_json_1.default.employees.find((u) => u.token === token);
    if (!exists)
        return res.status(401).json({ error: "Unauthorized" });
    next();
};
exports.validateAuth = validateAuth;
