const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");


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
    const { username } = req.headers;
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
    const { username } = req.headers;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
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