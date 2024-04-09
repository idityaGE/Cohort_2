const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    if (!username || !password) {
        return res.status(401).json({ message: "All field are requied" });
    }
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(403).json({ message: "User doesnt exist" });
    } else {
        next();
    }
}

module.exports = userMiddleware;