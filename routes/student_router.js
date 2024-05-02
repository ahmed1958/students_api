
import { Router } from "express";
import * as student_controller from "../controllers/Student_controller.js";

const studentRouter = Router();
studentRouter.get("/", student_controller.getAllStudent);
studentRouter.get("/:id", student_controller.geStudentById);
studentRouter.post("/", student_controller.create);
studentRouter.put("/:id", student_controller.editStudentById);
studentRouter.delete("/:id", student_controller.deleteStudent);
studentRouter.put("/:id/enroll", student_controller.enrollInCourse);
studentRouter.put("/:id/decline", student_controller.declineCourse);

export { studentRouter };
