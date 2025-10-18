import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getClient, getClientById, registerClient, updateClient } from "../controllers/client.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerClient);
router.route("/get").get(isAuthenticated,getClient);
router.route("/get/:id").get(isAuthenticated,getClientById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateClient);

export default router;

