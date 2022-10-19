import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
  hex: {
    type: String,
    required: true,
  },
});

const Color = mongoose.model("Color", colorSchema);

export default Color;
