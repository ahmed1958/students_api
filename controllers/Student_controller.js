import joi from "joi";
import { Student } from "../models/student.js";

function validate_Student(student) {
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
const getAllStudent = (req, res) => {
  
  res.send(Student);
};

////////////////////////////////////////////

const geStudentById = (req, res) => {
  const student = Student.find((c) => c.id === parseInt(req.params.id));
  if (!student) {
    res.status(404).send("the student with the given id not found");
  } else {
    res.send(student);
  }
};

/////////////////////////////////////////////////////
const addStudent = (req, res) => {
  const result = validate_Student(req.body);
  if (result.error) {
    res.sendStatus(400).json({ msg: result.error.details[0].message });
    return;
  }
  const student = {
    id: Student[Student.length - 1].id + 1,
    name: req.body.name,
    email: req.body.email,
  };
  Student.push(student);
  res.send(Student);
};

//////////////////////////////////////////////////////////////////

const editStudentById = (req, res) => {
  const student = Student.find((c) => c.id === parseInt(req.params.id));
  if (!student) res.status(404).send("the student with the given id not found");
  const result = validate_Student(req.body);
  if (result.error) {
    res.sendStatus(400).send(result.error.details[0].message);
    return;
  }
  if (req.body.name) {
    student.name = req.body.name;
  }
  if (req.body.email) {
    student.email = req.body.email;
  }
  res.send(Student);
};
/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////
const deleteStudent = (req, res) => {
  const student = Student.find((c) => c.id === parseInt(req.params.id));
  if (!student) res.status(404).send("the student with the given id not found");
  const index = Student.indexOf(student);
  Student.splice(index, 1);
  res.send(Student);
};

export {
  addStudent,
  deleteStudent,
  editStudentById,
  getAllStudent,
  geStudentById,
};
