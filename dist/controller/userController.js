"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userModel_1 = require("../model/userModel");
class UserController {
    static createUser = (req, res) => {
        const { empleado, nombre, edad, tel, password, email } = req.body;
        const response = userModel_1.UserModel.crateUser({ empleado, nombre, edad, tel, password, email });
        res.status(response).json({ empleado, nombre, edad, tel, email });
    };
}
exports.UserController = UserController;
