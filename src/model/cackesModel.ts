import db from "../db/pasteleria.json";
import jsonfile from "jsonfile";
import { any, object } from "zod";
import { randomUUID } from "node:crypto";



abstract class CackesModel {
    static getAllCackes = () => {
        return db.cakes;
    }

    static createCackes = (objUser: any) => {
        const { id, cacke, ingredients, size } = objUser;
        const cackes = db.cakes.find((c: any) => c.cacke === cacke);
        if (cackes) {
            return { error: "Existing cacke" };
        }

        const newCacke = { id, cacke, ingredients, size }
        db.cakes.push(newCacke);

        jsonfile.writeFileSync("./src/db/pasteleria.json", db);

        return { message: "Cacke created successfully" };
    }


    static readUserById = (id: string) => {
        const cacke = db.cakes.find((c) => c.id === id);
        if (!cacke) return 404;
        return cacke;
    };

    static updateCacke = (objUser: any) => {
        try {
            const { id, cacke, ingredients, size } = objUser;

            const cackes = db.cakes.find((c) => c.id === id);

            if (!cackes) {
                return { error: "Cackes not found" };
            }

            if (id) cackes.id = id;
            if (cacke) cackes.cacke = cacke;
            if (ingredients) cackes.ingredients = ingredients;
            if (size) cackes.size = size;


            jsonfile.writeFileSync("./src/db/pasteleria.json", db);
        } catch (error) {
            return new Error();
        }
        return { message: "Successfully modified cacke" };
    };



    static deleteUser = (id: string) => {
        const cacke = db.cakes.find((c) => c.id === id);
        if (!cacke) {
            return { error: "cacke not found" };
        }
        const cackes = db.cakes.filter((c) => c.id !== id);
        db.cakes = cackes;

        jsonfile.writeFileSync("./src/db/pasteleria.json", db);

        return { message: "Successfully delete cacke" };
    };



}





export { CackesModel };