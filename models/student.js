const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true,
        min: 13
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message: "{VALUE} is not a valid gender"
        }
    },
    class: {
        type: String,
        enum: {
            values: ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C", "3D"],
            message: "{VALUE} is not a valid class"
        }
    }
})

module.exports = mongoose.model('Student', studentSchema)