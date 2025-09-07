const express = require('express')
const router = express.Router();
const userController = require("../controller/userController.js")
const eventController = require("../controller/eventController.js")
const organizerController = require("../controller/organizerController.js");
const authMiddleware = require('../middleware/authMiddleware.js');
const { checkAuthenticated } = require('../controller/authController.js');

router.post('/register',authMiddleware,userController.sendData);
router.post('/register-event',authMiddleware,checkAuthenticated , eventController.sendDataEvent);
router.post('/register-organizer',authMiddleware,checkAuthenticated , organizerController.sendDataOrganizer);
module.exports = router;
