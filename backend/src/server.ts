import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration to allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json()); // Enabale Express to parse JSON bodies

app.use("/api", userRoutes);
app.use("/api/projects", projectRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
