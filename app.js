const express = require("express");
const app = express();
app.use(express.json());

const {courseRouter}= require("./routes/course_router")
app.use('api/courses/',courseRouter)

module.exports={app,};