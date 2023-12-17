const http = require('http');
// Create an HTTP server
const server = http.createServer((req, res) => {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Hello world, This is my Node.js server\n');
});
// Listen on port 10000 or a free port beyond 10000
const port = 10000;
server.listen(port, () => {
console.log(`Server is running at http://localhost:${port}/`);
});