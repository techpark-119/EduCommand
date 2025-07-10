const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Custom "logged-in" header (e.g., from Postman)
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

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
