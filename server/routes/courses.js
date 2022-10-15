import express from "express";

import {
	getCourses,
	createCourse,
	deleteCourse,
	deleteCourses,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);
router.delete("/all", deleteCourses);
router.delete("/:id", deleteCourse);

export default router;
