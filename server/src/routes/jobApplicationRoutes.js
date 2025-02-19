const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { validateRequest } = require('../utils/requestValidator');
const {
    getAllJobs,
    updateJob,
    deleteJob,
    createJob
} = require('../controllers/jobApplicationController');
const {
    getApplicationsByUserIdValidationSchema,
    updateJobValidationSchema,
    deleteJobValidationSchema,
    createJobValidationSchema
} = require('../validations/jobApplicationsValidationSchemas');

const router = express.Router();

router.get('/all/:id', [authenticateToken, getApplicationsByUserIdValidationSchema, validateRequest], getAllJobs);
router.post('/', [authenticateToken, createJobValidationSchema, validateRequest], createJob);
router.put('/:id', [authenticateToken, updateJobValidationSchema, validateRequest], updateJob);
router.delete('/:id', [authenticateToken, deleteJobValidationSchema, validateRequest], deleteJob);

module.exports = router;