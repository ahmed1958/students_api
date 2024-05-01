import { Router } from "express";
import * as course_controller from "../controllers/Course_controller.js";

const courseRouter = Router();
courseRouter.get("/", course_controller.getAllCourses);
courseRouter.get("/:id", course_controller.getCourseById);
courseRouter.post("/", course_controller.addCourse);
courseRouter.put("/:id", course_controller.editCourse);
courseRouter.delete("/:id", course_controller.deleteCourse);

export { courseRouter };
