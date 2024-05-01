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

const getAllTeacher = async (req, res) => {
  const index = await Teacher.find();
  res.json({
    data: index,
  });
};

const getTeacherById = async (req, res) => {
  const id = req.params.id;
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    res.status(404).send("the teacher with the given id not found");
  } else {
    res.send(teacher);
  }
};

const addTeacher = async (req, res) => {
  const result = validate_Teacher(req.body);
  if (result.error) {
    res.sendStatus(400).json({ msg: result.error.details[0].message });
    return;
  }

  const teacher = await Teacher.create({
    name: req.body.name,
    email: req.body.email,
  });
  return res.json(teacher);
};

const editTeacherById = async (req, res) => {
  const id = req.params.id;

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
  const teacher = await Teacher.findOneAndDelete({ _id: id });
  if (!teacher) res.status(404).send("the teacher with the given id not found");
  res.send(teacher);
};

export {
  getAllTeacher,
  getTeacherById,
  addTeacher,
  editTeacherById,
  deleteTeacherById,
};
