import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/db.js";
connectDB();
const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
