import joi from "joi";
import { Course } from "../models/courses.js";
import { Student } from "../models/student.js";

function validateCourse(course) {
  const schema = joi.object({ name: joi.string().min(3).required() });
  return schema.validate(course);
}

////////////////////////////////////
const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).send(allCourses);
  } catch (error) {
    res.status(400).send(error);
  }
};

////////////////////////////////////////////

const getCourseById = async (req, res) => {
  try {
    //findById
    const course = await Course.findOne({ _id: req.params.id })
      .populate("students")
      .populate("instructor_id");
    if (course) {
      return res.status(200).send(course);
    } else {
      return res.status(404).send("Course Not Found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

/////////////////////////////////////////////////////
const addCourse = async (req, res) => {
  try {
    const result = validateCourse(req.body);
    if (result.error) {
      res.status(400).json({ msg: result.error.details });
      return;
    }
    const course = await Course.create(req.body);
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

//////////////////////////////////////////////////////////////////

const editCourse = async (req, res) => {
  const userId = req.params.id;
  try {
    // const course = await Course.findByIdAndUpdate({ _id: userId }, req.body);
    const course = await Course.findOne({ _id: userId });
    if (!course) {
      res.status(400).send("course not found");
    }
    if (req.body.name) {
      course.name = req.body.name;
    }
    if (req.body.count) {
      course.count = req.body.count;
    }
    await course.save();
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};
/////////////////////////////////////////////////////////////
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id });
    if (!course) {
      res.status(400).send("course not found");
    }
    // remove course id from studnts
    await Student.updateMany(
      { courses: { $in: [req.params.id] } },
      { $pull: { courses: req.params.id } },
    );
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { getAllCourses, getCourseById, addCourse, editCourse, deleteCourse };
