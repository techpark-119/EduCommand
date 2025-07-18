const express = require('express');
const fs = require('fs');
const database = require('../db.json');
const app = express();

app.set('view engine', 'ejs');

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
app.use((req, res, next) => {
    fs.appendFile('db.json', 'data to append', (err) =>{
        if(err) throw err;
        console.log("The data to append was appended to file!")
    })
    next();
});

app.get('/', (req, res) => {
  const user = { name: "Sarah" }; // Simulating server-side data
  res.render('index', { user }); // Render 'index.ejs' with user data
});

app.get('/about', (req, res) => {
    res.send('This is the About page');
});

app.use(express.json()); 

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});

  const isLoggedIn = req.headers['logged-in'] === 'true';

  if (parsedUrl.pathname === '/login' && req.method === 'POST') {
    if (isLoggedIn) {
      // Already logged in, skip login process
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Already logged in. Redirecting to Dashboard Page...');
    } else {
      // Simulated login logic
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const credentials = new URLSearchParams(body);
        const username = credentials.get('username');
        const password = credentials.get('password');

        if (username === 'admin' && password === '1234') {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Login successful. Set "logged-in: true" header to access Dashboard.');
        } else {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          res.end('Invalid credentials.');
        }
      });
    }
  }

  else if (parsedUrl.pathname === '/dashboard' && req.method === 'GET') {
    if (isLoggedIn) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Dashboard Page');
    } else {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Unauthorized. Please log in first.');
    }
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});



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
