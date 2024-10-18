const express = require('express');
const { register, login, getUsers } = require('../controllers/authController');
const router = express.Router();

// POST: /api/auth/register
router.post('/register', register);

// POST: /api/auth/login
router.post('/login', login);

// GET: /api/auth/users
router.get('/users', getUsers); // New route for listing users

module.exports = router;
