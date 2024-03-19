import crypto from "node:crypto";
import fs from "node:fs";

const createUser = (userObj) => {
  const { username, email, password } = userObj;

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Continuar agregando a la db

  console.log(hashPassword);
};

const login = (userObj) => {
  const { username, tel, email, password } = userObj;
  const users = JSON.parse(fs.readFileSync("./database.json"));

  const user = users.find((u) => {
    if (u.username === username || u.tel === tel || u.email === email) {
      return u;
    }
  });

  if (!user) return "User not found";

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (user.password === hashPassword) {
    console.log(hashPassword, "pass encriptada");
    return "Coincide, esta loggeado";
  } else {
    return "No coincide, vuelve a intentarlo";
  }
};

const user = {
  username: "",
  tel: "",
  email: "gabriel@gmail.com",
  password: "pepito123",
};

const response = login(user);

console.log(response);
