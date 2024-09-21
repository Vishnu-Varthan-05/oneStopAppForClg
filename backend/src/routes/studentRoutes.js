const express = require('express');
const { createStudent, loginStudent} = require('../controllers/studentController');
const authenticateToken = require('../middleware/authenticateToken');
const { getWebinarController, getWebinarByIdController } = require('../controllers/webinarController');
const { getEventController, getEventByIdController } = require('../controllers/eventController');
const { getCompetitionController, getCompetitionByIdController } = require('../controllers/competitionController');
const { addWishlistController } = require('../controllers/wishlistController');
const { getTimeTableController } = require('../controllers/timetableController');


const router = express.Router();

router.post('/signup', createStudent);
router.post('/login' , loginStudent);

router.use(authenticateToken);

router.get('/webinar', getWebinarController);
router.get('/webinar/:id', getWebinarByIdController)

router.get('/event', getEventController);
router.get('/event/:id', getEventByIdController)

router.get('/competition', getCompetitionController);
router.get('/competition/:id', getCompetitionByIdController);

router.get('/timetable', getTimeTableController);

router.post('/wishlist', addWishlistController)

module.exports = router;
