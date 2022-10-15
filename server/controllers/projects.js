import mongoose from "mongoose";

import Project from "../models/project.js";

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

export const deleteProject = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send({ message: `Error: Id ${id} is invalid.` });
	}

	try {
		await Project.findByIdAndDelete(id);

		res.json({ message: `Project with id ${id} deleted successfully.` });
	} catch (error) {
		res.status(404).send(`Error: ${error}`);
	}
};

export const deleteProjects = async (req, res) => {
	try {
		await Project.deleteMany({});

		res.json({ message: "All projects deleted successfully." });
	} catch (error) {
		res.status(404).send(`Error: ${error}`);
	}
};
