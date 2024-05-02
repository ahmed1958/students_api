import mongoose from "mongoose";
import { CourseSchemaName, StudentSchemaName } from "./helpers.js";

const studentSchema = new mongoose.Schema({
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

export const Student = mongoose.model(StudentSchemaName, studentSchema);