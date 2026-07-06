// server-basic.js

// Import the built-in HTTP module
const http = require("http");

/*
req (Request Object)
- Contains information sent by the client.
- Includes the request method (GET, POST, etc.),
  requested URL, headers, and other request details.

res (Response Object)
- Used by the server to send data back to the client.
- Allows setting status codes, headers, and the response body.
*/

// Create the HTTP server
const server = http.createServer((req, res) => {

    // Log every incoming request
    console.log(`${req.method} ${req.url}`);

    /*
    req.method
    - The HTTP method used by the client.
    - Examples: GET, POST, PUT, DELETE.

    req.url
    - The requested path from the browser.
    - Examples:
        /
        /about
        /users
    */

    // Send response headers
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    // Send the response body
    res.end("Hello from Node.js!");
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("==================================");
    console.log("Server is running!");
    console.log("Open: http://localhost:3000");
    console.log("==================================");
});