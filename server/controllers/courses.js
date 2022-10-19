import mongoose from "mongoose";

import Course from "../models/course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { name } = req.body;
  try {
    let newCourse = new Course({ name });
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `Error: Id ${id} is invalid.` });
  }

  try {
    await Course.findByIdAndDelete(id);

    res.json({ message: `Course with id ${id} deleted successfully.` });
  } catch (error) {
    res.status(404).send(`Error: ${error}`);
  }
};

export const deleteCourses = async (req, res) => {
  try {
    await Course.deleteMany({});

    res.json({ message: "All courses deleted successfully." });
  } catch (error) {
    res.status(404).send(`Error: ${error}`);
  }
};
