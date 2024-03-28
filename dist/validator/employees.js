"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialUser = exports.validateUser = void 0;
const zod_1 = __importDefault(require("zod"));
const employees = zod_1.default.object({
    employee: zod_1.default.number(),
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    age: zod_1.default.number(),
    phone: zod_1.default.string(),
    email: zod_1.default.string(),
    token: zod_1.default.string()
});
const validateUser = (obj) => employees.safeParse(obj);
exports.validateUser = validateUser;
const validatePartialUser = (obj) => employees.partial().safeParse(obj);
exports.validatePartialUser = validatePartialUser;
