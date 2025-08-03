import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Charity Platform Starter Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
