import express from "express";

import { getProjects, createProject, updateProject, deleteProject, deleteProjects } from "../controllers/projects.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/all", deleteProjects);
router.delete("/:id", deleteProject);

export default router;
