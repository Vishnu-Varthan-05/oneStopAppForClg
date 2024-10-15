const express = require('express');
const { createFaculty, loginFaculty } = require('../controllers/facultyController');
const { getActiveCompetitionsController, getActiveEventsController, getActiveWebinarsController, getAllCompetitionsController, getAllEventsController, getAllWebinarsController } = require("../controllers/activeController");
const authenticateFacultyToken = require('../middleware/authenticateFacultyToken');
const { postCompetitionController, updateCompetitionController, deleteCompetitionController } = require('../controllers/competitionController');
const { postWebeveController, updateWebeveController, deleteWebeveController } = require('../controllers/webeveController');
const { postTimeTableController, getTimeTableByFaculty } = require('../controllers/timetableController');
const router = express.Router();

router.post('/signup', createFaculty);
router.post('/login', loginFaculty);

router.use(authenticateFacultyToken);

router.get('/competitionCount', getActiveCompetitionsController);
router.get('/webinarCount', getActiveWebinarsController);
router.get('/eventCount', getActiveEventsController);

router.get('/competitions', getAllCompetitionsController)
router.post('/competitions', postCompetitionController);
router.put('/competitions/:id', updateCompetitionController);
router.delete('/competitions/:id', deleteCompetitionController);

router.get('/events', getAllEventsController)
router.get('/webinars', getAllWebinarsController)
router.post('/webevents', postWebeveController);
router.put('/webevents/:id', updateWebeveController);
router.delete('/webevents/:id', deleteWebeveController);

router.post('/timetable', postTimeTableController);
router.get('/timetable', getTimeTableByFaculty);
module.exports = router;
