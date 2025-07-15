const express = require('express');
const app = express();
const fs = require('fs');
const database = require('../db.json');
app.get('/users', (req, res) => {
    res.send(database);
})

app.post('/users', (req, res) => {
    database.
    console.log(req.body);
    res.send('Data received');
});

app.listen(3000, () => {
    console.log('Express server is running on http://localhost:3000');
});
