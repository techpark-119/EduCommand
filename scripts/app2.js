const express = require('express');
const app = express();
const fs = require('fs')

app.use((req, res, next) => {
    fs.appendFile('db.json', 'data to append', (err) =>{
        if(err) throw err;
        console.log("The data to append was appended to file!")
    })
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});


app.get('/about', (req, res) => {
    res.send('This is the About page');
});

app.use(express.json()); 

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});


app.listen(3000, () => {
    console.log('Express server is running on http://localhost:3000');
});
