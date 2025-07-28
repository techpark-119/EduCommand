const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../../database.json');

exports.getProfile = (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading database file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const database = JSON.parse(data);
        const adminEmail = req.session.user.email; // Assuming user email is stored in session
        const adminInfo = Object.values(database.admins).find(admin => admin.email === adminEmail);

        if (!adminInfo) {
            return res.status(404).send('Admin not found');
        }

        res.render('profile', { admin: adminInfo });
    });
};