"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userModel_1 = require("../model/userModel");
const node_crypto_1 = __importDefault(require("node:crypto"));
const node_crypto_2 = require("node:crypto");
const employees_1 = require("../validator/employees");
class UserController {
    static readUser = (req, res) => {
        const user = userModel_1.UserModel.readUser();
        res.json(user);
    };
    static createUser = (req, res) => {
        const validate = (0, employees_1.validatePartialUser)(req.body);
        if (!validate.success) {
            return res.status(400).json({ error: "BAD_REQUEST" });
        }
        const { username, password, age, email, phone } = req.body;
        const hashedPassword = node_crypto_1.default.createHash("sha256").update(password).digest("hex");
        const uuidEmployee = (0, node_crypto_2.randomUUID)();
        const newEmployee = {
            employee: uuidEmployee,
            username,
            age,
            phone,
            password: hashedPassword,
            email,
        };
        const response = userModel_1.UserModel.crateUser(newEmployee);
        res.status(201).json(response);
    };
    static readUserByEmail = (req, res) => {
        const { email } = req.params;
        const user = userModel_1.UserModel.readUserByEmail(email);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    };
    // static updateUser = (req: Request, res: Response) => {
    //   const { username } = req.params;
    //   const { employee, age, phone, password, email, token } = req.body;
    //   const objUser = { employee, username, age, phone, password, email, token };
    //   const response = UserModel.updateUser(objUser);
    //   if (!response.message) {
    //     res.status(400).json({ error: "Error to update user" });
    //   }
    //   return res.json(response);
    // };
    static updateUser = (req, res) => {
        const { username } = req.params;
        const { employee, age, phone, password, email, token } = req.body;
        const objUser = { employee, username, age, phone, password, email, token };
        const validationResult = (0, employees_1.validatePartialUser)(objUser);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error });
        }
        const response = userModel_1.UserModel.updateUser(req.body);
        if (!response.message) {
            return res.status(400).json({ error: "user not found" });
        }
        return res.json(response);
    };
    static deleteUser = (req, res) => {
        const { username } = req.params;
        const response = userModel_1.UserModel.deleteUser(username);
        if (!response.message) {
            return res.status(400).json({ error: "Error to delete user" });
        }
        return res.json(response);
    };
    static login = (req, res) => {
        const validate = (0, employees_1.validatePartialUser)(req.body);
        if (!validate.success)
            return res
                .status(400)
                .json({ error: "USERNAME_OR_PASSWORD_INCORRECT!" });
        const response = userModel_1.UserModel.login(req.body);
        if (response === 404)
            return res.status(404).json({ error: "Not found user" });
        if (response === 400)
            return res.status(400).json({ error: "Bad request" });
        res.json(response);
    };
    static logout = (req, res) => {
        const { username } = req.body;
        const response = userModel_1.UserModel.logout(username);
        if (response.error)
            return res.status(404).json(response);
        res.json(response);
    };
}
exports.UserController = UserController;
