const jwt = require("jsonwebtoken");
const { jwtPass } = require("../config");


// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    console.log(req.headers)
    const { authorization } = req.headers;
    console.log("token : ", authorization);
    try {
        const decoded = jwt.verify(authorization, jwtPass);
        console.log('decoded:', decoded);
        // const admin = await Admin.findOne({ username: decoded.username });
        // jwt saves you one db call
        if (!decoded.username) {
            return res.status(401).json({ msg: "Unauthorized Admin" });
        }
        req.admin = decoded.username;
        next();
    } catch (e) {
        res.status(403).json({ msg: "Error verying token", error: e });
    }
}

module.exports = adminMiddleware;