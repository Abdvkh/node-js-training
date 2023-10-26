const http = require('http');
const { handleRequest } = require('./routes');

const PORT = 5000;

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
