import { Request, Response, response } from "express";
import { UserModel } from "../model/userModel";
import crypto from "node:crypto"
import { randomUUID } from "node:crypto";
import { validateUser, validatePartialUser } from "../validator/employees";



abstract class UserController {
  static readUser = (req: Request, res: Response) => {
    const user = UserModel.readUser();
    res.json(user)
  }

  static createUser = (req: Request, res: Response) => {
    const validate = validatePartialUser(req.body);
    if (!validate.success) {
      return res.status(400).json({ error: "BAD_REQUEST" })
    }

    const { username, password, age, email, phone } = req.body;
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const uuidEmployee = randomUUID()
    const newEmployee = {
      employee: uuidEmployee,
      username,
      age,
      phone,
      password: hashedPassword,
      email,
    }
    const response = UserModel.crateUser(newEmployee);
    res.status(201).json(response);
  }

  static readUserByEmail = (req: Request, res: Response) => {
    const { email } = req.params;
    const user = UserModel.readUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  };


  static updateUser = (req: Request, res: Response) => {
    const { username } = req.params;
    const { employee, age, phone, password, email, token } = req.body;

    const objUser = { employee, username, age, phone, password, email, token };

    const validationResult = validatePartialUser(objUser);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const response = UserModel.updateUser(objUser);

    if (!response.message) {
      return res.status(400).json({ error: "Error to update user" });
    }

    return res.json(response);
  };

  static deleteUser = (req: Request, res: Response) => {

    const { username } = req.params;
    const response = UserModel.deleteUser(username);

    if (!response.message) {
      return res.status(400).json({ error: "Error to delete user" });
    }

    return res.json(response);

  };
  static login = (req: Request, res: Response) => {
    const validate = validatePartialUser(req.body);

    if (!validate.success)
      return res
        .status(400)
        .json({ error: "USERNAME_OR_PASSWORD_INCORRECT!" });

    const response = UserModel.login(req.body);

    if (response === 404)
      return res.status(404).json({ error: "Not found user" });
    if (response === 400) return res.status(400).json({ error: "Bad request" });

    res.json(response);
  };

  static logout = (req: Request, res: Response) => {
    const { username } = req.body;
    const response = UserModel.logout(username);

    if (response.error)
      return res.status(404).json(response);

    res.json(response);
  };
}


export { UserController };