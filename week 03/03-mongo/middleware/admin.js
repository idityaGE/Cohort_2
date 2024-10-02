const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    if (!username || !password) {
        return res.status(401).json({ message: "All field are requied" });
    }
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
        return res.status(403).json({ message: "Admin doesnt exist" });
    } else {
        next();
    }
}

module.exports = adminMiddleware;