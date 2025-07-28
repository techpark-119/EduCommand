const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.get("/login", (req, res) => {
  res.render("login", { title: "EduCommand - Student Management System" });
});

router.get('/logout', authController.logout);

module.exports = router;