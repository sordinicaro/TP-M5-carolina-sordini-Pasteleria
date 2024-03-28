"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const pasteleria_json_1 = __importDefault(require("../db/pasteleria.json"));
const jsonfile_1 = __importDefault(require("jsonfile"));
const node_crypto_1 = require("node:crypto");
class UserModel {
    static readUser = () => {
        return pasteleria_json_1.default.employees;
    };
    static crateUser = (objUser) => {
        const { employee, username, age, phone, password, email } = objUser;
        const user = pasteleria_json_1.default.employees.find((user) => user.email === email);
        if (user) {
            return { error: "Existing employee" };
        }
        const newEmployee = { employee, username, age, phone, password, email, token: "" };
        pasteleria_json_1.default.employees.push(newEmployee);
        jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        return { message: "Employee created successfully" };
    };
    static readUserByEmail = (email) => {
        const user = pasteleria_json_1.default.employees.find((u) => u.email === email);
        if (!user)
            return 404;
        return user;
    };
    static updateUser = (objUser) => {
        try {
            const { employee, username, age, phone, password, email, token } = objUser;
            const user = pasteleria_json_1.default.employees.find((n) => n.username === username);
            if (!user) {
                return { error: "User not found" };
            }
            if (username)
                user.username = username;
            if (employee)
                user.employee = employee;
            if (age)
                user.age = age;
            if (phone)
                user.phone = phone;
            if (password)
                user.password = password;
            if (email)
                user.email = email;
            if (token)
                user.token = token;
            jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        }
        catch (error) {
            return new Error();
        }
        return { message: "Successfully modified user" };
    };
    static deleteUser = (username) => {
        const user = pasteleria_json_1.default.employees.find((n) => n.username === username);
        if (!user) {
            return { error: "user not found" };
        }
        const employees = pasteleria_json_1.default.employees.filter((employee) => employee.username !== username);
        pasteleria_json_1.default.employees = employees;
        jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        return { message: "Successfully delete user" };
    };
    static login = (objUser) => {
        try {
            const { username, password } = objUser;
            const user = pasteleria_json_1.default.employees.find((u) => u.username === username);
            if (!user)
                return 404;
            if (user.password !== password)
                return 400;
            const token = (0, node_crypto_1.randomUUID)();
            user.token = token;
            jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        }
        catch (error) {
            return new Error();
        }
        return { message: "Logged User" };
    };
    static logout = (username) => {
        const user = pasteleria_json_1.default.employees.find((u) => u.username === username);
        if (!user)
            return { error: "user not found" };
        user.token = "";
        jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        return { message: "Log out User" };
    };
}
exports.UserModel = UserModel;
