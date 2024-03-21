import db from "../db/pasteleria.json";
import crypto from "node:crypto"
import { writeFileSync } from "jsonfile";
import { any, object } from "zod";


abstract class UserModel {

  static crateUser = (objUser: any) => {
    try {
      const { empleado, nombre, edad, tel, hashedPassword, email } = objUser;
      const user = db.empleados.find((user: any) => user.nombre === nombre || user.email === email);
      if (user) {
        return 409;
      }

      const newEmpleado = { empleado, nombre, edad, tel, password: hashedPassword, email, token: "" }
      db.empleados.push(newEmpleado);

      writeFileSync("./src/db/pasteleria.json", db);

      return 200;
    } catch (error) {
      console.error("Error:", error);

      return 500;
    }
  }

}





export { UserModel };