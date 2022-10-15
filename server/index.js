import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import projectRoutes from "./routes/projects.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Needed to use process.env variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_URL;

app.use("/projects", projectRoutes);

// Connect to mongoDB
mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		// Listen to port
		app.listen(PORT, () =>
			console.log(`Server Running on Port: http://localhost:${PORT}`)
		)
	)
	.catch((error) => console.log(`Error: ${error}`));
