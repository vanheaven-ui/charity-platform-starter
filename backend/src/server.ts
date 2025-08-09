import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import donationRoutes from "./routes/donationRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import eventRoutes from "./routes/eventRoutes";
import proposalRoutes from "./routes/proposalRoutes";
import notificationRoutes from "./routes/notificationRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://charity-platform-starter.vercel.app", // production
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // Enable Express to parse JSON bodies

app.use("/api", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
