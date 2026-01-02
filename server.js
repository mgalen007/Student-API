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
    try{
        const students = await Student.find()
        res.json(students)
    } catch(err){
        console.log('Connection error: ', err)
    }
})

app.get('/api/students/:name', async (req, res) => {
    try{
        const uniqueStudent = await Student.findOne({name: req.params.name})
        if (!uniqueStudent) res.status(404).json({message: 'Student not found'})
        res.json(uniqueStudent)
    } catch(err){
        console.log('Connection error: ', err)
    }
})

app.post('/api/students', async (req, res) => {
    try{
        const newStudent = new Student({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            class: req.body.class
        })
        const savedStudent = await newStudent.save()
        res.status(201).json(savedStudent)
    } catch(err){
        console.log('Connection error: ', err)
    }
})

app.put('/api/students/:name', async (req, res) => {
    try{
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
    } catch(err){
        console.log('Connection error: ', err)
    }
})

app.delete('/api/students/:name', async (req, res) => {
    try{
        const deletedStudent = await Student.findOneAndDelete(
            {name: req.params.name}
        )
        res.status(200).json(deletedStudent)
    } catch(err){
        console.log('Connection error: ', err)
    }
})

// Run the server on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

