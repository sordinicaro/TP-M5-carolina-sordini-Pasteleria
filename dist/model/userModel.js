"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const pasteleria_json_1 = __importDefault(require("../db/pasteleria.json"));
const jsonfile_1 = require("jsonfile");
class UserModel {
    static crateUser = (objUser) => {
        const { empleado, nombre, edad, tel, password, email } = objUser;
        pasteleria_json_1.default.empleados.push({ empleado, nombre, edad, tel, password, email, token: "" });
        (0, jsonfile_1.writeFileSync)("./src/db/pasteleria.json", pasteleria_json_1.default);
        return 200;
    };
}
exports.UserModel = UserModel;
