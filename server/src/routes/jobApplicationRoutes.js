const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { validateRequest } = require('../utils/requestValidator');
const { getAllJobs } = require('../controllers/jobApplicationController');
const { getApplicationsByUserIdValidationSchema } = require('../validations/jobApplicationsValidationSchemas');

const router = express.Router();


router.get('/all/:id', [authenticateToken, getApplicationsByUserIdValidationSchema, validateRequest],  getAllJobs);

module.exports = router;
