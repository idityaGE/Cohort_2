const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { jwtPass } = require("../config");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "All field are requied" });
    }
    try {
        await User.create({ username, password });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).send({ message: "Error creating user account", error: error });
    }
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "All field are requied" });
    }
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ username }, jwtPass /*, { expiresIn: '1h' }*/);
        res.status(200).json({ token });
    } catch (error) {
        return res.status(500).send({ message: "Error signing in", error: error });
    }
})

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).send({ message: "Error fetching courses", error: error });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const { courseId } = req.params;
    const { authorization } = req.headers;
    const { username } = jwt.verify(authorization, jwtPass);
    if(!authorization){
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!courseId) {
        return res.status(400).json({ message: "Course Id is required" });
    }
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error fetching course", error: error });
    }
    try {
        await User.updateOne({ username }, { $push: { purchasedCourses: courseId } });
        res.status(200).json({ message: "Purchase complete!" });
    } catch (error) {
        return res.status(500).send({ message: "Error purchasing course", error: error });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const { authorization } = req.headers;
    const { username } = jwt.verify(authorization, jwtPass);
    const user = await User.findOne({ username });
    console.log(user.purchasedCourses);
    try {
        const courses = await Course.find({ _id: { $in: user.purchasedCourses } });
        res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).send({ message: "Error fetching purchased courses", error: error });
    }
});

module.exports = router

//all the routes are working fine