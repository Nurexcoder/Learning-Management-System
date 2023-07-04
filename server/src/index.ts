import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { json } from "body-parser";
import { SignupRouter } from "./routes/auth/signUp";
dotenv.config();

const app: Express = express();
app.use(json())
app.use(SignupRouter)
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message || "an unknown error occurred!",
  });
});

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  return next(new Error("Invalid route"));
});

const initializeConfig = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/lms");
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, async () => {
  await initializeConfig();
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
