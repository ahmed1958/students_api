import express from "express";
import { courseRouter } from "./routes/course_router.js";
import { studentRouter } from "./routes/student_router.js";

const app = express();
app.use(express.json());

app.use("/api/courses/", courseRouter);
app.use("/api/students/", studentRouter);

export { app };
