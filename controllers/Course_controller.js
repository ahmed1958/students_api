const joi =require('joi');
const Courses =require('../models/courses');
function validate_Course (course)
{
    const schema = joi.object({name : joi.string().min(3).required()}); 
    return schema.validate(course);
}
////////////////////////////////////
const getAllCourses = (req,res) => {
  console.log('here');
  res.send(Courses);  
};

////////////////////////////////////////////

const getCoursesById =(req,res)=> {
  const course=Courses.find(c => c.id === parseInt(req.params.id));
  if(!course)
  {
    res.status(404).send('the course with the given id not found');
  }
  else{
    res.send(course);
  }
};

/////////////////////////////////////////////////////
const addCourse =(req, res)=> {
console.log('here2');
const result =validate_Course(req.body);
if(result.error)
{res.send(400).send(result.error.details[0].message);
console.log(result);
return;
}
const course = {
    id:Courses.length +1,
    name: req.body.name
};
Courses.push(course);
};

//////////////////////////////////////////////////////////////////

const editCourseById = (req, res) => {
const course=Courses.find(c => c.id === parseInt(req.params.id));
if (!course)
   res.status(404).send('the course with the given id not found');
const result =validate_Course(req.body);
if(result.error)
{res.send(400).send(result.error.details[0].message);
console.log(result);
return;
}
 course.name =req.body.name;
};
/////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////
const deleteCourse = (req, res) => {
const course=Courses.find(c => c.id === parseInt(req.params.id));
if (!course)
   res.status(404).send('the course with the given id not found');
const index =Courses.indexOf(course);
Courses.splice(index, 1)
};

module.exports={
    addCourse,
    deleteCourse,
    editCourseById,
    getAllCourses,
    getCoursesById
}