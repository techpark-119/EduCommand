const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../../database.json');

// Function to read data from the database.json file
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

// Function to write data to the database.json file
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