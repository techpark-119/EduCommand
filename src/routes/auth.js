const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

router.get("/login", (req, res) => {
  res.render("login", { title: "EduCommand - Student Management System" });
});

// Logout route
router.get('/logout', authController.logout);

module.exports = router;