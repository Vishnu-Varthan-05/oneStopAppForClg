const express = require('express');
const { createStudent, loginStudent} = require('../controllers/studentController');
const authenticateToken = require('../middleware/authenticateToken');
const { getWebinarController } = require('../controllers/webinarController');
const { getEventController } = require('../controllers/eventController');
const { getCompetitionController } = require('../controllers/competitionController');
const { addWishlistController } = require('../controllers/wishlistController');


const router = express.Router();

router.post('/signup', createStudent);
router.post('/login' , loginStudent);

router.use(authenticateToken);

router.get('/webinar', getWebinarController);
router.get('/event', getEventController);
router.get('/competition', getCompetitionController);
router.post('/wishlist', addWishlistController)
module.exports = router;
