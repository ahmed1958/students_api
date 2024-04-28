//u must create a file for each database(objects for now) and then in model.export put the object name
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const courseSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    instructor_id: {
        type: Schema.Types.ObjectId, // Specify the type as ObjectId
        ref: 'Instructor' // Reference to the 'Instructor' model
    }
});

export const Course = model('Course', courseSchema);


