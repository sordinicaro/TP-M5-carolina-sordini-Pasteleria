"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialEmpleados = void 0;
const zod_1 = __importDefault(require("zod"));
const empleados = zod_1.default.object({
    empleado: zod_1.default.number(),
    nombre: zod_1.default.string(),
    edad: zod_1.default.number(),
    director: zod_1.default.string(),
    tel: zod_1.default.number(),
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    token: zod_1.default.string()
});
const validatePartialEmpleados = (objMovie) => {
    const responseValidator = empleados.partial().safeParse(objMovie);
    return responseValidator;
};
exports.validatePartialEmpleados = validatePartialEmpleados;
