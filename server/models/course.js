import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
