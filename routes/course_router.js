const {Router}= require('express');
const courseRouter = Router();
const Course_controller = require("../controllers/Course_controller");
courseRouter.get("/", Course_controller. getAllCourses);
courseRouter.get("/:id", Course_controller.getCoursesById);
courseRouter.post("/", Course_controller.addCourse);
courseRouter.put("/:id", Course_controller.editCourseById);
courseRouter.delete("/:id", Course_controller.deleteCourse);

module.exports={courseRouter}