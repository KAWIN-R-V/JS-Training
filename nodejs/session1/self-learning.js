// self-learning.js

/*
===========================================================
Task 1
Rewrite files.js using fs.promises and async/await
===========================================================
*/

const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

async function fileOperations() {
    try {
        const filePath = path.join(__dirname, "async-output.txt");

        // Write to file
        await fs.writeFile(
            filePath,
            "Hello from fs.promises!"
        );

        console.log("File created successfully.");

        // Read file
        const content = await fs.readFile(filePath, "utf8");
        console.log("\nFile Content:");
        console.log(content);

        // Append to file
        await fs.appendFile(
            filePath,
            "\nThis line was appended using async/await."
        );

        const updated = await fs.readFile(filePath, "utf8");

        console.log("\nUpdated Content:");
        console.log(updated);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

/*
===========================================================
Task 2

__dirname and __filename

These are global variables available in CommonJS modules.

__dirname
Returns the absolute path of the current folder.

__filename
Returns the absolute path of the current file.

In ES Modules (import/export), these variables are not available.

Alternative:

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

===========================================================
*/

/*
===========================================================
Task 3

Using the readline module

Ask the user for their name.

===========================================================
*/

function askName() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter your name: ", (name) => {

        console.log(`Hello, ${name}!`);

        rl.close();

    });

}

/*
===========================================================
Run the demonstrations
===========================================================
*/

async function main() {

    console.log("===== fs.promises Demo =====");
    await fileOperations();

    console.log("\n===== readline Demo =====");

    askName();

}

main();

/*
PS C:\Users\Kawin R V\JS_Training\nodejs\session1> node self-learning.js
===== fs.promises Demo =====
File created successfully.

File Content:
Hello from fs.promises!

Updated Content:
Hello from fs.promises!
This line was appended using async/await.

===== readline Demo =====
Enter your name: Kawin R V
Hello, Kawin R V
*/