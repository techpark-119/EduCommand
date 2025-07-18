const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../..', 'database.json');

exports.login = (req, res) => {
    const { email, password, rememberMe } = req.body;

    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }

        const users = JSON.parse(data);
        const admin = Object.values(users).find(user => user.email === email);

        if (admin && admin.password === password) {
            req.session.user = admin;

            if (rememberMe) {
                res.cookie('rememberMe', admin.email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
            }

            return res.redirect('/dashboard');
        } else {
            return res.status(401).send('Invalid credentials');
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('rememberMe');
        res.redirect('/login');
    });
};