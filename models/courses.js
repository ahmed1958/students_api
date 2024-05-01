//u must create a file for each database(objects for now) and then in model.export put the object name
import mongoose from "mongoose";
import {
  CourseSchemaName,
  StudentSchemaName,
  TeacherSchemaName,
} from "./helpers.js";
const Schema = mongoose.Schema;
const model = mongoose.model;

const courseSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  instructor_id: {
    type: Schema.Types.ObjectId,
    ref: TeacherSchemaName,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: StudentSchemaName,
    },
  ],
});

export const Course = model(CourseSchemaName, courseSchema);
