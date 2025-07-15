const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url.toLowerCase();
  const method = req.method.toUpperCase();

  // Get "userloggedin" header, default to false
  const isLoggedIn = req.headers['userloggedin'] === 'true';
    
  // Set default headers
  res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && url === '/login') {
    if (isLoggedIn) {
      res.writeHead(200);
      res.end('Already logged in');
    } else {
      res.writeHead(200);
      res.end('Login page');
    }
  } else if (method === "GET" && url === "/dashboard") {
    if (isLoggedIn) {
      res.writeHead(200);
      res.end("Dashboard page");
    } else {
      res.writeHead(200);
      res.end("You are not logged in, please log in first");
    }
  } else if (method === "GET" && url === "/") {
    res.writeHead(200);
    res.end("Welcome to the Home Page");
  } else {
    res.writeHead(404);
    res.end("Error 404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
