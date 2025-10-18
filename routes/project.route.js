import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getClientProjects, getAllProjects, getProjectById, postProject } from "../controllers/project.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postProject);
router.route("/get").get(isAuthenticated, getAllProjects);
router.route("/getclientprojects").get(isAuthenticated, getClientProjects);
router.route("/get/:id").get(isAuthenticated, getProjectById);

export default router;

