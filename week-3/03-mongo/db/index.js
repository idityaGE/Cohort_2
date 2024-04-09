const mongoose = require('mongoose');

// Connect to MongoDB
async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/coursesell')
}
connect()
    .then(res => console.log("Connected to db"))
    .catch(err => console.log(err));

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}