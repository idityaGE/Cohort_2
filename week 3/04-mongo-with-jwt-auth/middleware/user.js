const jwt = require("jsonwebtoken");
const { jwtPass } = require("../config");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { authorization } = req.headers;
    try {
        const decoded = jwt.verify(authorization, jwtPass);
        if (!decoded.username) {
            return res.status(401).json({ msg: "Unauthorized User" });
        }
        req.user = decoded.username;
        next();
    } catch (e) {
        res.status(403).json({ msg: "Error verying token", error: e });
    }
}

module.exports = userMiddleware;