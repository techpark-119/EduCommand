const express = require('express');
const fs = require('fs');
const database = require('../db.json');
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use(express.static('public'));


// Routes
app.get('/users', (req, res) => {
    res.json(database);
});

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Updating user with ID: ${userId}`);
    res.send(`User with ID ${userId} updated`);
});

app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Partially updating user with ID: ${userId}`);
    res.send(`User with ID ${userId} partially updated`);
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Deleting user with ID: ${userId}`);
    res.send(`User with ID ${userId} deleted`);
});


app.listen(3000, () => {
    console.log('Express server is running on http://localhost:3000');
});
