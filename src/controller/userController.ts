import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import crypto from "node:crypto"



abstract class UserController {
    static createUser = (req: Request, res: Response) => {
        const { empleado, nombre, edad, tel, password, email } = req.body;
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const response = UserModel.crateUser({ empleado, nombre, edad, tel, hashedPassword, email })
        res.status(response).json({ empleado, nombre, edad, tel, email });

    }
}

export { UserController };