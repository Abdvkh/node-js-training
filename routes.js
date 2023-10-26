const { handleUsersRequest } = require('./user.controller');

function handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith('/users')) {
        handleUsersRequest(req, res, url);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
}

module.exports = { handleRequest };
