import mongoose from "mongoose";

import Project from "../models/project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: "course",
      model: "Course",
      populate: {
        path: "color",
        model: "Color",
      },
    });

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
    newProject = await Project.populate(newProject, {
      path: "course",
      model: "Course",
      populate: {
        path: "color",
        model: "Color",
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `Error: Id ${id} is invalid.` });
  }

  const project = req.body;
  console.log(project);
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, { ...project }, { new: true }).populate({
      path: "course",
      model: "Course",
      populate: {
        path: "color",
        model: "Color",
      },
    });

    res.status(200).json(updatedProject);
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
