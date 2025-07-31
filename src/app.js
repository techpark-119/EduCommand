const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const profileRoutes = require('./routes/profile');

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/profile', profileRoutes);

const authMiddleware = require('./middleware/authMiddleware');
app.use('/students', authMiddleware, studentRoutes);
app.use('/profile', authMiddleware, profileRoutes);


app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    // Read student data for dashboard stats
    const databasePath = path.join(__dirname, '../database.json');
    fs.readFile(databasePath, 'utf8', (err, data) => {
        let totalStudents = 0, activeStudents = 0, pendingRequests = 0;
        if (!err) {
            try {
                const database = JSON.parse(data);
                const students = Object.values(database.students || {});
                totalStudents = students.length;
                activeStudents = students.filter(s => (s.status || 'Active') === 'Active').length;
                // You can define pendingRequests logic as needed
                pendingRequests = 0;
            } catch (e) {}
        }
        res.render('dashboard', {
            user: req.session.user,
            totalStudents,
            activeStudents,
            pendingRequests
        });
    });
});

// app.get('/dashboard', (req, res) => {
//     if (!req.session.user) {
//         return res.redirect('/auth/login');
//     }
//     res.render('dashboard', { user: req.session.user });
// });
// fs.readFile(databasePath, "utf8", (err, data) => {
//     if (err) {
//         return res.status(500).json({ message: "Error reading database" });
//         }
//         const database = JSON.parse(data);
//         const student = database.students[studentId];
//         if (!student) {
//         return res.status(404).json({ message: "Student not found" });
//         }
    
//         // Update student fields
//         student.name = req.body.name || student.name;
//         student.roll = req.body.roll || student.roll;
//         student.program = req.body.program || student.program;
//         student.status = req.body.status || student.status;
//         student.email = req.body.email || student.email;
//         student.skills = req.body.skills
//         ? req.body.skills.split(",").map((skill) => skill.trim())
//         : student.skills;
    
//         fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ message: "Error saving student" });
//         }
//   res.redirect("/students");
//     });
// });

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});