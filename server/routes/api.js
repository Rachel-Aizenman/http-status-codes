const express = require('express')
const request = require('request')
const router = express.Router()
const Student = require('../models/Student')


const s1 = new Student({
    firstName: "Yaniv",
    lastName: "Sultan"
})
const s2 = new Student({
    firstName: "Noam",
    lastName: "Lior"
})
const s3 = new Student({
    firstName: "Guy",
    lastName: "Dahan"
})
const s4 = new Student({
    firstName: "Renee",
    lastName: "Cohen"
})
const s5 = new Student({
    firstName: "Rachel"
})



//401 & 404 in API
router.get(`/city/:cityName`, async function (req, res) {
    const cityName = req.params.cityName
    await request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=b93baf3898e69c5c5c2f91dac2e8709`, function (err, response) {
        let data = JSON.parse(response.body)
        if (data.cod == 404) {
            res.status(404).send('City Not Found')
        }
        else if (data.cod == 401) {
            res.status(401).send('You are not authorized to see this info')
        }
        else {
            res.send(data)

        }

    })
})

//server showing 201 & 500
router.get('/exmp1/:studentName', async function (req, res) {
    const studentName = req.params.studentName
    const savedStudent = await Student.findOne({
        firstName: studentName
    }) //await this
    const validStudent = savedStudent.lastName
    if (!validStudent) {
        res.status(500).send('We are sorry, we are missing information about this student.')
    }
    else {
        res.send(savedStudent)
    }
})

router.post('/exmp1/addStudent', async function (req, res) {
    const newStudent = new Student(req.body)
    await newStudent.save()
    res.status(201).send(`${req.body.firstName}, welcome to our class`)
})


module.exports = router
