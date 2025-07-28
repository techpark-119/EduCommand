const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const profileRoutes = require('./routes/profile');

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/profile', profileRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('dashboard', { user: req.session.user });
});

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

// Error handling
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});