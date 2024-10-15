const express = require('express');
const { getAllYears } = require('../controllers/yearController');
const { getAllDepartments } = require('../controllers/departmentController');
const router = express.Router();

router.get('/year', getAllYears)
router.get('/department', getAllDepartments)

module.exports = router;