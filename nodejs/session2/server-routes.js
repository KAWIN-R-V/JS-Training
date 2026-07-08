// server-routes.js

// Import the built-in HTTP module
const http = require("http");

// Create the server
const server = http.createServer((req, res) => {

    // Log every incoming request
    console.log(`${req.method} ${req.url}`);

    // Home Route
    if (req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Home Page");

    }

    // About Route
    else if (req.url === "/about") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("About Page");

    }

    // Status Route
    else if (req.url === "/status") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        const status = {
            status: "ok",
            uptime: process.uptime()
        };

        res.end(JSON.stringify(status));

    }

    // 404 Route
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Page Not Found");

    }

});

/*
process.uptime()

Returns the number of seconds the Node.js application
has been running since it started.

Example:
12.45 means the server has been running for 12.45 seconds.

------------------------------------------------------------

Content-Type: application/json

Tells the browser (or client) that the response
contains JSON data instead of plain text.

The browser, Postman, or any API client knows how
to interpret and process the response correctly.
*/

server.listen(3001, () => {

    console.log("====================================");
    console.log("Server Running");
    console.log("http://localhost:3001");
    console.log("====================================");

});