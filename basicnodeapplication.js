const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = "sample.html";
  let contentType = "text/html";

  if (req.url === "/sample.css") {
    filePath = "sample.css";
    contentType = "text/css";
  } else if (req.url === "/sample.js") {
    filePath = "sample.js";
    contentType = "application/javascript";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("My server is running on http://localhost:3000");
});
