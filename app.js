import express from "express";
import { courseRouter } from "./routes/course_router.js";

const app = express();
app.use(express.json());

app.use("/api/courses/", courseRouter);

export { app };
