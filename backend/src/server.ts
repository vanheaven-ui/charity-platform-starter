import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import donationRoutes from "./routes/donationRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import eventRoutes from "./routes/eventRoutes";
import proposalRoutes from "./routes/proposalRoutes";
import notificationRoutes from './routes/notificationRoutes';

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
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/notifications', notificationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
