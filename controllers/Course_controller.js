import joi from "joi";
import { Course } from "../models/courses.js";

function validate_Course(course) {
  const schema = joi.object({ name: joi.string().min(3).required() });
  return schema.validate(course);
}

////////////////////////////////////
const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({});
        res.status(200).send(allCourses);
    } catch (error) {
        res.status(400).send(error);
    }
};

////////////////////////////////////////////

const getCourseById = async (req, res) => {
    try {
        //findById
        const allCourses = await Course.findOne({ _id: req.params.id });
        if(allCourses){
        res.status(200).send(allCourses);}
        else{res.status(200).send('Course Not Found');}
    } catch (error) {
        res.status(400).send(error);
    }
};

/////////////////////////////////////////////////////
const addCourse = async (req, res) => {
    try {
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
       if (!course){res.status(400).send('course not found');}
        if (req.body.name) {
            course.name = req.body.name;
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
        const course = await Course.deleteOne({ _id: req.params.id });
        res.status(200).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

export{
    getAllCourses,
    getCourseById,
    addCourse,
    editCourse,
    deleteCourse,
};
