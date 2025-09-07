const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');


router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);


router.get('/logout', authController.logout)
router.get('/check-auth', authMiddleware, authController.checkAuthenticated)

module.exports = router;