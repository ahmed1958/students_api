import { Router } from "express";
import * as student_controller from "../controllers/Student_controller.js";

const studentRouter = Router();
studentRouter.get("/", student_controller.getAllStudent);
studentRouter.get("/:id", student_controller.geStudentById);
studentRouter.post("/", student_controller.addStudent);
studentRouter.put("/:id", student_controller.editStudentById);
studentRouter.delete("/:id", student_controller.deleteStudent);

export { studentRouter };
