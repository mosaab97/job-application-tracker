const express = require('express');
const { fetchUsers, signup, login, updateUserDetails } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const { loginValidationSchema, signupValidationSchema } = require('../validations/usersValidationSchemas');
const { validateRequest } = require('../utils/requestValidator');

const router = express.Router();


router.post('/signup', [signupValidationSchema, validateRequest],  signup);
router.post('/login', [loginValidationSchema, validateRequest], login);

// Protected route
router.put('/update', authenticateToken, updateUserDetails);

module.exports = router;
