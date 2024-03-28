import { Request, Response, response } from "express";
import { CackesModel } from "../model/cackesModel";
import crypto from "node:crypto"
import { randomUUID } from "node:crypto";
import { validatePartialCacke } from "../validator/cackes";



abstract class CackesController {
    static getAllCackes = (req: Request, res: Response) => {
        const user = CackesModel.getAllCackes();
        res.json(user)
    }

    static createCackes = (req: Request, res: Response) => {
        const validate = validatePartialCacke(req.body);
        if (!validate.success) {
            return res.status(400).json({ error: "BAD_REQUEST" })
        }

        const { cacke, ingredients, size, } = req.body;
        const uuidCacke = randomUUID()
        const newCacke = {
            id: uuidCacke,
            cacke,
            ingredients,
            size,
        }
        const response = CackesModel.createCackes(newCacke);
        res.status(201).json(response);
    }

    static getCackesById = (req: Request, res: Response) => {
        const { id } = req.params;
        const user = CackesModel.readUserById(id);
        if (!user) return res.status(404).json({ error: "Cacke not found" });
        res.json(user);
    };


    static updateCacke = (req: Request, res: Response) => {
        const { id } = req.params;
        const { cacke, ingredients, size } = req.body;

        const objUser = { id, cacke, ingredients, size };

        const validationResult = validatePartialCacke(objUser);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error });
        }

        const response = CackesModel.updateCacke(objUser);

        if (!response.message) {
            return res.status(400).json({ error: "Error to update cacke" });
        }

        return res.json(response);
    };

    static deleteCacke = (req: Request, res: Response) => {

        const { id } = req.params;
        const response = CackesModel.deleteUser(id);

        if (!response.message) {
            return res.status(400).json({ error: "Error to delete cacke" });
        }

        return res.json(response);

    };
}
export { CackesController };