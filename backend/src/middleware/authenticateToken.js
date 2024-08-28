const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.body.studentId = decoded.id;
        req.body.studentYear = decoded.year;
        req.body.studentDepartment = decoded.department;

        next();
    });
};

module.exports = authenticateToken;
