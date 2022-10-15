import mongoose, { Schema } from "mongoose";

const projectSchema = Schema({
	name: String,
	description: String,
	course: {
		type: Schema.Types.ObjectId,
		ref: "Course",
	},
	dueDate: Date,
	importance: Number,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
