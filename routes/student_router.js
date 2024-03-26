import { Router } from "express";
import * as student_controller from "../controllers/Student_controller.js";

const studentRouter = Router();
studentRouter.get("/", student_controller.getAllStudent);
studentRouter.get("/:id", student_controller.geStudentById);


export { studentRouter };
