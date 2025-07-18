const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get all students
router.get('/', studentController.getAllStudents);

// Get a specific student by ID
router.get('/:id', studentController.searchStudents);

// Create a new student
router.post('/', studentController.createStudent);

// Update an existing student
router.put('/:id', studentController.updateStudent);

// Delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;