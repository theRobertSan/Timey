import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
