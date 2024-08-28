const express = require('express');
const { createStudent, loginStudent} = require('../controllers/studentController');
const authenticateToken = require('../middleware/authenticateToken');
const { getWebeveController } = require('../controllers/webeveController');
const router = express.Router();

router.post('/signup', createStudent);
router.post('/login' , loginStudent)

router.use(authenticateToken);

router.get('/webeve', getWebeveController)

module.exports = router;
