const express = require('express');
const { createFaculty, loginFaculty } = require('../controllers/facultyController');

const router = express.Router();

router.post('/signup', createFaculty);
router.post('/login' , loginFaculty);

module.exports = router;