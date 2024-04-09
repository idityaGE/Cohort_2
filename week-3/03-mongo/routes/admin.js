const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try {
        await Admin.create({ username, password });
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        return res.status(500).send({ message: "Error creating admin account", error: error });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;
    try {
        const newCourse = await Course.create({ title, description, price, imageLink });
        res.status(201).json({ message: 'Course created successfully', courseId: newCourse._id });
    } catch (error) {
        return res.status(500).send({ message: "Error creating course", error: error });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).send({ message: "Error fetching courses", error: error });
    }
});

module.exports = router;

//all clear