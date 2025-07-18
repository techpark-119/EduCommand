const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route to get the admin profile
router.get('/', profileController.getProfile);

module.exports = router;