import { Request, Response, NextFunction } from "express";
import db from "../db/pasteleria.json"

const validateAuth = (req: Request, res: Response, next: NextFunction) => {

  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const exists = db.employees.find((u: any) => u.token === token);
  if (!exists) return res.status(401).json({ error: "Unauthorized" });

  next();
};

export { validateAuth }