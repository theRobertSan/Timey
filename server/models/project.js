import mongoose, { Schema } from "mongoose";

const projectSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
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
