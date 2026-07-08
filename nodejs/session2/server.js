// server.js

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Load users from data.json
const dataPath = path.join(__dirname, "data.json");
const users = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const server = http.createServer((req, res) => {

    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`${req.method} ${pathname}`);

    // Response headers
    res.setHeader("Content-Type", "application/json");

    /*
    ------------------------------------------
    GET /
    ------------------------------------------
    */

    if (pathname === "/" && req.method === "GET") {

        res.writeHead(200);

        res.end(JSON.stringify({
            message: "Welcome to the User API"
        }));

    }

    /*
    ------------------------------------------
    GET /users
    ------------------------------------------
    */

    else if (pathname === "/users" && req.method === "GET") {

        res.writeHead(200);

        res.end(JSON.stringify(users, null, 2));

    }

    /*
    ------------------------------------------
    GET /users/top
    ------------------------------------------
    */

    else if (pathname === "/users/top" && req.method === "GET") {

        const topUsers = users.filter(user => user.score >= 90);

        res.writeHead(200);

        res.end(JSON.stringify(topUsers, null, 2));

    }

    /*
    ------------------------------------------
    GET /users/:id
    Example:
    /users/2
    ------------------------------------------
    */

    else if (pathname.startsWith("/users/") && req.method === "GET") {

        const id = parseInt(pathname.split("/")[2]);

        const user = users.find(u => u.id === id);

        if (!user) {

            res.writeHead(404);

            return res.end(JSON.stringify({
                error: "User not found"
            }));

        }

        res.writeHead(200);

        res.end(JSON.stringify(user, null, 2));

    }

    /*
    ------------------------------------------
    GET /health
    ------------------------------------------
    */

    else if (pathname === "/health" && req.method === "GET") {

        res.writeHead(200);

        res.end(JSON.stringify({

            status: "OK",

            uptime: process.uptime(),

            timestamp: new Date().toISOString()

        }, null, 2));

    }

    /*
    ------------------------------------------
    404
    ------------------------------------------
    */

    else {

        res.writeHead(404);

        res.end(JSON.stringify({

            error: "Route not found"

        }, null, 2));

    }

});

/*
---------------------------------------------------

Why use JSON APIs?

JSON APIs allow communication between:

- Frontend ↔ Backend
- Mobile Apps ↔ Servers
- Third-party Applications

JSON is lightweight,
easy to read,
and supported by almost every programming language.

---------------------------------------------------

What is process.uptime()?

Returns the number of seconds the Node.js application
has been running.

Useful for health monitoring.

---------------------------------------------------

Why send proper HTTP status codes?

200 → Success

404 → Resource Not Found

500 → Internal Server Error

Status codes help clients understand whether
their request succeeded or failed.
*/

server.listen(3002, () => {

    console.log("====================================");
    console.log("User API Server Running");
    console.log("http://localhost:3002");
    console.log("====================================");

});