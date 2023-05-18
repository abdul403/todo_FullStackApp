import express from "express";
import userRouter from "./routers/users.js";
import taskRouter from "./routers/tasks.js";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

dotenv.config;

export const app = express();
config({
  path: "./data/config.env",
});

//using middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

// using Error middileware
app.use(errorMiddleware);
