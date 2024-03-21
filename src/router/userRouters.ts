
import { UserController } from "../controller/userController";
import { validateAuth } from "../middlware/validator";
import { Router } from "express";


const userRouters = Router();

userRouters.post("/register", UserController.createUser)

export{userRouters}
