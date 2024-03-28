import { CackesController } from "../controller/cackesController";
import { validateAuth } from "../middlware/validator";
import { Router } from "express";


const cackesRouters = Router();

cackesRouters.post("/", validateAuth, CackesController.createCackes);
cackesRouters.get("/", CackesController.getAllCackes);
cackesRouters.get("/:id", CackesController.getCackesById);
cackesRouters.patch("/:id", validateAuth, CackesController.updateCacke);
cackesRouters.post("/:id", validateAuth, CackesController.deleteCacke)



export { cackesRouters }
