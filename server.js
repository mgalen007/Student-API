require('dotenv').config() // Load environment variables

// Load dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI
const Student = require('./models/student')

// Middleware
app.use(cors())
app.use(express.json())

// Connect to the database
mongoose.connect(mongoURI)
    .then(() => {
        console.log('DB connected successfully!')
    })
    .catch((err) => {
        console.log("Connection error: ", err)
    })

// CRUD routes
app.get('/api/students', async (req, res) => {
    const students = await Student.find()
    res.json(students)
})

app.get('/api/students/:name', async (req, res) => {
    const uniqueStudent = await Student.findOne({name: req.params.name})
    res.json(uniqueStudent)
})

app.post('/api/students', async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        class: req.body.class
    })
    const savedStudent = await newStudent.save()
    res.status(201).json(savedStudent)
})

app.put('/api/students/:name', async (req, res) => {
    const newStudent = await Student.findOneAndReplace(
        {name: req.params.name},
        {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            class: req.body.class
        },
        {new: true}
    )
    res.status(201).json(newStudent)
})

app.delete('/api/students/:name', async (req, res) => {
    const deletedStudent = await Student.findOneAndDelete(
        {name: req.params.name}
    )
    res.status(200).json(deletedStudent)
})

// Run the server on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

