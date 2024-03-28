
import { UserController } from "../controller/userController";
import { validateAuth } from "../middlware/validator";
import { Router } from "express";


const userRouters = Router();

userRouters.post("/login", UserController.login);
userRouters.delete("/logout", validateAuth, UserController.logout);
userRouters.get("/", UserController.readUser)
userRouters.post("/register", UserController.createUser)
userRouters.get("/:email", UserController.readUserByEmail);
userRouters.patch("/:username", validateAuth, UserController.updateUser)
userRouters.delete("/:username", validateAuth, UserController.deleteUser)



export { userRouters }
