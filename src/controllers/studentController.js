const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../../database.json');

exports.getAllStudents = (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading database' });
        }
        const database = JSON.parse(data);
        const students = Object.values(database).filter(user => user.id.startsWith('user'));
        res.render('students', { students });
    });
};

exports.createStudent = (req, res) => {
    const newStudent = {
        id: `user${Date.now()}`, // Simple ID generation
        name: req.body.name,
        email: req.body.email,
        Skills: req.body.skills.split(',').map(skill => skill.trim())
    };

    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading database' });
        }
        const database = JSON.parse(data);
        database[newStudent.id] = newStudent;

        fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving student' });
            }
            res.redirect('/students');
        });
    });
};

exports.updateStudent = (req, res) => {
    const studentId = req.params.id;

    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading database' });
        }
        const database = JSON.parse(data);
        const student = database[studentId];

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;
        student.Skills = req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()) : student.Skills;

        fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating student' });
            }
            res.redirect('/students');
        });
    });
};

exports.deleteStudent = (req, res) => {
    const studentId = req.params.id;

    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading database' });
        }
        const database = JSON.parse(data);

        if (!database[studentId]) {
            return res.status(404).json({ message: 'Student not found' });
        }

        delete database[studentId];

        fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting student' });
            }
            res.redirect('/students');
        });
    });
};

exports.searchStudents = (req, res) => {
    const query = req.query.q.toLowerCase();

    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading database' });
        }
        const database = JSON.parse(data);
        const students = Object.values(database).filter(user => 
            user.id.startsWith('user') && 
            (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
        );
        res.render('students', { students });
    });
};