const express = require('express');
const { createStudent, loginStudent} = require('../controllers/studentController');
const authenticateToken = require('../middleware/authenticateToken');
const { getWebinarController } = require('../controllers/webinarController');
const { getEventController } = require('../controllers/eventController');


const router = express.Router();

router.post('/signup', createStudent);
router.post('/login' , loginStudent);

router.use(authenticateToken);

router.get('/webinar', getWebinarController);
router.get('/event', getEventController);

module.exports = router;
