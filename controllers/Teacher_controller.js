import joi from "joi";
import { Teacher } from "../models/teacher.js";

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

const getAllTeacher = (req, res) => {
  res.send(Teacher);
};

const getTeacherById = (req, res) => {
  const teacher = Teacher.find((c) => c.id === parseInt(req.params.id));
  if (!teacher) {
    res.status(404).send("the teacher with the given id not found");
  } else {
    res.send(teacher);
  }
};

const addTeacher = (req, res) => {
  const result = validate_Teacher(req.body);
  if (result.error) {
    res.sendStatus(400).json({ msg: result.error.details[0].message });
    return;
  }
  const teacher = {
    id: Teacher[Teacher.length - 1].id + 1,
    name: req.body.name,
    email: req.body.email,
  };
  Teacher.push(teacher);
  res.send(Teacher);
};

const editTeacherById = (req, res) => {
  const teacher = Teacher.find((c) => c.id === parseInt(req.params.id));
  if (!teacher) res.status(404).send("the teacher with the given id not found");

  if (req.body.name) {
    teacher.name = req.body.name;
  }
  if (req.body.email) {
    teacher.email = req.body.email;
  }
  res.send(teacher);
};

const deleteTeacherById = (req, res) => {
  const teacher = Teacher.find((c) => c.id === parseInt(req.params.id));
  if (!teacher) res.status(404).send("the teacher with the given id not found");
  const index = Teacher.indexOf(teacher);
  Teacher.splice(index, 1);
  res.send(teacher);
};

export {
  getAllTeacher,
  getTeacherById,
  addTeacher,
  editTeacherById,
  deleteTeacherById,
};
