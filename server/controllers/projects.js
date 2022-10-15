import express from "express";
import mongoose from "mongoose";

import Project from "../models/project.js";
import Course from "../models/course.js";

export const getProjects = async (req, res) => {
	try {
		const projects = await Project.find().populate("course");

		res.json(projects);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createProject = async (req, res) => {
	const { name, description, course, dueDate, importance } = req.body;
	try {
		let newProject = new Project({
			name,
			description,
			course,
			dueDate,
			importance,
		});
		await newProject.save();

		// Populate course
		newProject = await Project.populate(newProject, { path: "course" });

		res.status(201).json(newProject);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};
