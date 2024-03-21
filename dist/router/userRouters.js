"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const userController_1 = require("../controller/userController");
const express_1 = require("express");
const userRouters = (0, express_1.Router)();
exports.userRouters = userRouters;
userRouters.post("/register", userController_1.UserController.createUser);
