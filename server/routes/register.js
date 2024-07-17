const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser
} = require('../controllers/users');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;

