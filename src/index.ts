import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {info} from "./db/pasteleria.json"
import { userRouters } from "./router/userRouters";

const app = express();
app.use(express.json());

const PORT = process.env.PORT_API!;



app.get("/api", (req, res) => {
  res.json(info)
})

app.use("/api/users", userRouters)

app.use("*", (req, res) => {
  res.status(404).json({ error: "recurso not found" });
});


app.listen(PORT, () => {
  console.log(`SERVER_LISTENING_ON_PORT -> http://localhost:${PORT}`);
});
