const {Router}= require('express');
const courseRouter = Router();
const course_controller = require("../controllers/Course_controller");
courseRouter.get('/', course_controller. getAllCourses);
courseRouter.get('/:id', course_controller.getCoursesById);
courseRouter.post('/', course_controller.addCourse);
courseRouter.put('/:id', course_controller.editCourseById);
courseRouter.delete('/:id', course_controller.deleteCourse);

module.exports={courseRouter}