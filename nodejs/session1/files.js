// files.js

// Import required built-in modules
const fs = require("fs");
const path = require("path");

// Create an absolute path to output.txt
const filePath = path.join(__dirname, "output.txt");

/*
writeFileSync()
Creates a new file if it doesn't exist.
If the file already exists, it overwrites its contents.
Useful when you want to replace the entire content of a file.
*/
fs.writeFileSync(filePath, "Hello from Node.js file system!");

console.log("File created successfully.");

/*
readFileSync()
Reads the contents of a file synchronously.
The 'utf8' encoding converts the file data into readable text.
*/
const content = fs.readFileSync(filePath, "utf8");

console.log("\nFile content:");
console.log(content);

/*
appendFileSync()
Appends new content to the end of the existing file
without deleting the previous content.
*/
fs.appendFileSync(filePath, "\nThis line was appended.");

const updated = fs.readFileSync(filePath, "utf8");

console.log("\nUpdated content:");
console.log(updated);

/*
Difference between writeFileSync() and appendFileSync()

writeFileSync():
- Creates a file if it does not exist.
- Overwrites the entire file if it already exists.

appendFileSync():
- Creates the file if it does not exist.
- Adds new content to the end of the existing file without removing previous data.
*/

/*
File created successfully.

File content:
Hello from Node.js file system!

Updated content:
Hello from Node.js file system!
This line was appended.
*/