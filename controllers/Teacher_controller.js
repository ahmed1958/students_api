import joi from "joi";
import { Teacher } from "../models/teacher.js";
import { Course } from "../models/courses.js";

function validate_Teacher(teacher) {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),
  });
  return schema.validate(teacher);
}

const getAllTeacher = async (req, res) => {
  const index = await Teacher.find();
  return res.json({
    data: index,
  });
};

const getTeacherById = async (req, res) => {
  const id = req.params.id;
  const teacher = await Teacher.findById(id).populate("courses");
  if (!teacher) {
    res.status(404).send("the teacher with the given id not found");
  } else {
    res.send(teacher);
  }
};

const addTeacher = async (req, res) => {
  const result = validate_Teacher(req.body);
  if (result.error) {
    res.status(400).json({ msg: result.error.details });
    return;
  }

  try {
    const teacher = await Teacher.create({
      name: req.body.name,
      email: req.body.email,
    });
    return res.json(teacher);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send("Email already exists");
    }
    res.status(500).send("server error");
    throw e;
  }
};

function validatePutTeacher(teacher) {
  const schema = joi.object({
    name: joi.string().min(3).optional(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .optional(),
  });
  return schema.validate(teacher);
}
const editTeacherById = async (req, res) => {
  const id = req.params.id;
  const result = validatePutTeacher(req.body);
  if (result.error) {
    res.status(400).json({ msg: result.error.details });
    return;
  }
  const { name, email } = req.body;
  const teacher = await Teacher.findOneAndUpdate(
    { _id: id },
    { name, email },
    {
      new: true,
    },
  );
  if (!teacher) res.status(404).send("the teacher with the given id not found");

  return res.send(teacher);
};

const deleteTeacherById = async (req, res) => {
  const id = req.params.id;
  // update courses with instructor_id to null
  await Course.findOneAndUpdate({ instructor_id: id }, { instructor_id: null });
  const teacher = await Teacher.findOneAndDelete({ _id: id });
  if (!teacher) res.status(404).send("the teacher with the given id not found");
  res.send(teacher);
};

// /////////////////////////////////////////////////////

function validateEnrollmentReq(course) {
  const schema = joi.object({
    courseId: joi.string().required(),
  });
  return schema.validate(course);
}

async function enrollTeacherIntoCourse(req, res) {
  const { id } = req.params;
  const validation = validateEnrollmentReq(req.body);
  if (validation.error) {
    return res.status(400).json({ msg: validation.error.details });
  }
  const { courseId } = req.body;
  const teacher = await Teacher.findById(id);
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404).send("the course with the given id not found");
  }
  if (!teacher) {
    res.status(404).send("the teacher with the given id not found");
  }

  teacher.courses.addToSet(course);
  course.instructor_id = teacher;
  await Promise.all([teacher.save(), course.save()]);
  return res.send(teacher);
}

async function declineCourse(req, res) {
  /**
   * teacher id
   */
  const id = req.params.id;
  const result = validateEnrollmentReq(req.body);
  if (result.error) {
    return res.status(400).json({ msg: result.error.details });
  }
  try {
    const { courseId } = req.body;
    const [teacher, course] = await Promise.all([
      Teacher.findById(id),
      Course.findById(courseId),
    ]);
    if (!teacher) {
      return res.status(404).send("the student with the given id not found");
    }
    if (!course) {
      return res.status(404).send("the course with the given id not found");
    }
    teacher.courses.pull(course);
    course.instructor_id = null;
    await Promise.all([teacher.save(), course.save()]);
    return res.send(teacher);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}
export {
  getAllTeacher,
  getTeacherById,
  addTeacher,
  editTeacherById,
  deleteTeacherById,
  enrollTeacherIntoCourse,
  declineCourse,
};
