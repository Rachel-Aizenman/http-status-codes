const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
})

const Student = mongoose.model("student", studentSchema)
module.exports = Student
