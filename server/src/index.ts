import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { json } from "body-parser";
import { SignupRouter } from "./routes/auth/signUp";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Express = express();

// const options = {
//   definition: {
//     openapi: "3.0.1",
//     info: {
//       title: "REST API for Swagger Documentation",
//       version: "1.0.0",
//     },
//     schemes: ["http", "https"],
//     servers: [{ url: "http://localhost:5000/" }],
//   },
//   apis: [
//     `${__dirname}/routes/example-route.ts`,
//     "./dist/routes/example-route.js",
//   ],
// };
// const swaggerSpec = swaggerJSDoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(json());
app.use(SignupRouter);
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
