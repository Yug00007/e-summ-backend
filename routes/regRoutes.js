const express = require('express')
const router = express.Router();
const userController = require("../controller/userController.js")
const eventController = require("../controller/eventController.js")
const organizerController = require("../controller/organizerController.js")

router.post('/register', userController.sendData);
router.post('/register-event', eventController.sendDataEvent);
router.post('/register-organizer', organizerController.sendDataOrganizer);
module.exports = router;
