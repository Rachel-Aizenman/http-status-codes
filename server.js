const express = require("express")
const port = 3000
const app = express()
const mongoose = require('mongoose')
const api = require('./server/routes/api')
const path = require('path')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'node_modules')))



mongoose.connect('mongodb://localhost/studentsDB', { useNewUrlParser: true,  useUnifiedTopology: true })

app.use('/', api)

//======//
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

