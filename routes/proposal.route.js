import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { submitProposal, getProposalsForProject, getSubmittedProposals, updateStatus } from "../controllers/proposal.controller.js";
 
const router = express.Router();

router.route("/submit/:id").get(isAuthenticated, submitProposal);
router.route("/get").get(isAuthenticated, getSubmittedProposals);
router.route("/:id/proposals").get(isAuthenticated, getProposalsForProject);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;

