const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../../database.json');

const readDatabase = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(databasePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
};

const writeDatabase = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(databasePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = {
    readDatabase,
    writeDatabase,
};