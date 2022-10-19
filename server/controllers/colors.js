import mongoose from "mongoose";

import Color from "../models/color.js";

export const getColors = async (req, res) => {
  try {
    const colors = await Color.find();

    res.json(colors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
