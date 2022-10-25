import mongoose, { Schema } from "mongoose";

const projectSchema = Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  description: {
    type: String,
    maxLength: 100,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 4,
    default: 2,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
