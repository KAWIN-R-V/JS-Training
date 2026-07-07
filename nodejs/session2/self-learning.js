// self-learning.js

/*
====================================================
Task 1: Using fs.promises with async/await
====================================================
*/

const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

async function fileOperations() {
    try {
        const filePath = path.join(__dirname, "async-output.txt");

        // Create file
        await fs.writeFile(filePath, "Hello from fs.promises!");

        console.log("File created successfully.");

        // Read file
        const data = await fs.readFile(filePath, "utf8");

        console.log("\nFile Content:");
        console.log(data);

        // Append content
        await fs.appendFile(filePath, "\nThis line was added using async/await.");

        const updated = await fs.readFile(filePath, "utf8");

        console.log("\nUpdated Content:");
        console.log(updated);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

/*
====================================================
Task 2: readline Module
====================================================

Reads input from the terminal.
*/

function askName() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter your name: ", (name) => {

        console.log(`Welcome, ${name}!`);

        rl.close();

    });

}

/*
====================================================
Task 3

Difference between CommonJS and ES Modules

CommonJS

Uses:
const fs = require("fs");

module.exports = value;

Default module system in Node.js.

--------------------------------------------

ES Modules

Uses:

import fs from "fs";

export default value;

Requires:

"type":"module"

inside package.json.

ES Modules are the modern JavaScript module system.

====================================================
*/

async function main() {

    console.log("===== fs.promises Demo =====");

    await fileOperations();

    console.log("\n===== Readline Demo =====");

    askName();

}

main();

/*
===== fs.promises Demo =====
File created successfully.

File Content:
Hello from fs.promises!

Updated Content:
Hello from fs.promises!
This line was added using async/await.

===== Readline Demo =====
Enter your name: Kawin R V
Welcome, Kawin R V!
*/