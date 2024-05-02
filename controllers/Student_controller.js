
import joi from "joi";
import { Student } from "../models/student.js";
import { Course } from "../models/courses.js";

function validateStudent(student) {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  return schema.validate(student);
}

////////////////////////////////////
const getAllStudent = async (req, res) => {
  const students = await Student.find();
  res.json({
    data: students,
  });
};

////////////////////////////////////////////

const geStudentById = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findById(id).populate("courses");
  if (!student) {
    return res.status(404).send("the student with the given id not found");
  } else {
    return res.json(student);
  }
};

/////////////////////////////////////////////////////
const create = async (req, res) => {
  const result = validateStudent(req.body);
  if (result.error) {
    return res.status(400).json({ msg: result.error.details });
  }
  try {
    const student = await Student.create({
      name: req.body.name,
      email: req.body.email,
    });
    return res.json(student);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send("Email already exists");
    }
  }
};

//////////////////////////////////////////////////////////////////

function validatePutStudent(student) {
  const schema = joi.object({
    name: joi.string().min(3).optional(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .optional(),
  });
  return schema.validate(student);
}
const editStudentById = async (req, res) => {
  const id = req.params.id;
  const result = validatePutStudent(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const { name, email } = req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { _id: id },
      { name, email },
      { new: true },
    );
    if (!student)
      res.status(404).send("the student with the given id not found");
    return res.send(student);
  } catch (e) {
    console.log(
      "🪵 [Student_controller.js:82] ~ token ~ \x1b[0;32me\x1b[0m = ",
      e,
    );
    return res.status(400).send(e.message);
  }
};
/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////
const deleteStudent = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOneAndDelete({ _id: id });
  if (!student)
    return res.status(404).send("the student with the given id not found");
  // remove student from courses
  await Course.updateMany(
    { students: { $in: [req.params.id] } },
    { $pull: { students: id } },
  );
  return res.send(student);
};

/**
 * validate
 * {
 *  courseId: string
 * }
 */
function validateEnrollmentReq(course) {
  const schema = joi.object({
    courseId: joi.string().required(),
  });
  return schema.validate(course);
}
async function enrollInCourse(req, res) {
  const id = req.params.id;
  const result = validateEnrollmentReq(req.body);
  if (result.error) {
    return res.status(400).json({ msg: result.error.details });
  }
  try {
    const { courseId } = req.body;
    const [student, course] = await Promise.all([
      Student.findById(id),
      Course.findById(courseId),
    ]);
    if (!student) {
      return res.status(404).send("the student with the given id not found");
    }
    if (!course) {
      return res.status(404).send("the course with the given id not found");
    }
    student.courses.addToSet(course);
    course.students.addToSet(student);
    await Promise.all([student.save(), course.save()]);
    return res.send(student);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function declineCourse(req, res) {
  /**
   * student id
   */
  const id = req.params.id;
  const result = validateEnrollmentReq(req.body);
  if (result.error) {
    return res.status(400).json({ msg: result.error.details });
  }
  try {
    const { courseId } = req.body;
    const [student, course] = await Promise.all([
      Student.findById(id),
      Course.findById(courseId),
    ]);
    if (!student) {
      return res.status(404).send("the student with the given id not found");
    }
    if (!course) {
      return res.status(404).send("the course with the given id not found");
    }
    student.courses.pull(course);
    course.students.pull(student);
    await Promise.all([student.save(), course.save()]);
    return res.send(student);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

export {
  create,
  deleteStudent,
  editStudentById,
  getAllStudent,
  geStudentById,
  enrollInCourse,
  declineCourse,
};
