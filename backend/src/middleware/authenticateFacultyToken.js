const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticateFacultyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access token required" });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.body.facultyId = decoded.id;
    req.body.facultyDepartment = decoded.department;

    next();
    });
};

module.exports = authenticateFacultyToken;
