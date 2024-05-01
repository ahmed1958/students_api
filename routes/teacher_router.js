import { Router } from "express";
import * as teacher_controller from "../controllers/Teacher_controller.js";

const teacherRouter = Router();
teacherRouter.get("/", teacher_controller.getAllTeacher);
teacherRouter.get("/:id", teacher_controller.getTeacherById);
teacherRouter.post("/", teacher_controller.addTeacher);
teacherRouter.put("/:id", teacher_controller.editTeacherById);
teacherRouter.delete("/:id", teacher_controller.deleteTeacherById);
teacherRouter.put("/:id/enroll", teacher_controller.enrollTeacherIntoCourse);

export { teacherRouter };
