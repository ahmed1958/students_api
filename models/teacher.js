import mongoose from "mongoose";
import { CourseSchemaName, TeacherSchemaName } from "./helpers.js";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: CourseSchemaName,
    },
  ],
});

export const Teacher = mongoose.model(TeacherSchemaName, teacherSchema);
