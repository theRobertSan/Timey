import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import projectRoutes from "./routes/projects.js";
import courseRoutes from "./routes/courses.js";
import colorRoutes from "./routes/colors.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Needed to use process.env variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_URL;

app.use("/projects", projectRoutes);
app.use("/courses", courseRoutes);
app.use("/colors", colorRoutes);

// Connect to mongoDB
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    // Listen to port
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`Error: ${error}`));
