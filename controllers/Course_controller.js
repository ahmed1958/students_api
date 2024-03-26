import joi from "joi";
import { Courses } from "../models/courses.js";

function validate_Course(course) {
  const schema = joi.object({ name: joi.string().min(3).required() });
  return schema.validate(course);
}

////////////////////////////////////
const getAllCourses = (req, res) => {
  res.send(Courses);
};

////////////////////////////////////////////

const getCoursesById = (req, res) => {
  const course = Courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("the course with the given id not found");
  } else {
    res.send(course);
  }
};

/////////////////////////////////////////////////////
const addCourse = (req, res) => {
  const result = validate_Course(req.body);
  if (result.error) {
    res.send(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: Courses.length + 1,
    name: req.body.name,
  };
  Courses.push(course);
  res.send(Courses);
};

//////////////////////////////////////////////////////////////////

const editCourseById = (req, res) => {
  const course = Courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course with the given id not found");
  const result = validate_Course(req.body);
  if (result.error) {
    res.sendStatus(400).send(result.error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(Courses);
};
/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////
const deleteCourse = (req, res) => {
  const course = Courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course with the given id not found");
  const index = Courses.indexOf(course);
  Courses.splice(index, 1);
  res.send(Courses);
};

export {
  addCourse,
  deleteCourse,
  editCourseById,
  getAllCourses,
  getCoursesById,
};
