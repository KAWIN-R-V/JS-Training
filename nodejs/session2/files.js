// files.js

// Import required built-in modules
const fs = require("fs");
const path = require("path");

// Create the path for output.txt
const filePath = path.join(__dirname, "output.txt");

/*
writeFileSync()
Creates a new file if it doesn't exist.
If the file already exists, it replaces all existing content.
*/
fs.writeFileSync(filePath, "Line 1 - written by Node.js");

console.log("File written successfully.");

/*
readFileSync()
Reads the contents of the file synchronously.
The "utf8" encoding converts the file data into readable text.
*/
const content = fs.readFileSync(filePath, "utf8");

console.log("\nFile Content:");
console.log(content);

/*
appendFileSync()
Adds new data to the end of the file without removing
the existing contents.
*/
fs.appendFileSync(filePath, "\nLine 2 - appended");
fs.appendFileSync(filePath, "\nLine 3 - appended again");

// Read the updated file
const updated = fs.readFileSync(filePath, "utf8");

console.log("\nUpdated Content:");
console.log(updated);

console.log("----------------------------------");

/*
Check whether a file exists before reading it.
*/

const checkPath = path.join(__dirname, "missing.txt");

if (fs.existsSync(checkPath)) {

    console.log("missing.txt already exists.");

} else {

    console.log("missing.txt does not exist.");
    console.log("Creating missing.txt...");

    fs.writeFileSync(
        checkPath,
        "Created because it was missing."
    );

    console.log("missing.txt created successfully.");
}

/*
Difference between writeFileSync() and appendFileSync()

writeFileSync()
- Creates a new file.
- Overwrites the entire file if it already exists.

appendFileSync()
- Creates the file if needed.
- Adds new content to the end without deleting existing data.

----------------------------------------------------------

What happens if readFileSync() is called on a file that
does not exist?

Node.js throws an ENOENT (Error NO ENTry) exception,
and the program stops executing.

A better approach is to:
1. Check if the file exists using fs.existsSync().
2. Or wrap readFileSync() inside a try...catch block
   to handle the error gracefully.
*/


/*
File Content:
Line 1 - written by Node.js

Updated Content:
Line 1 - written by Node.js
Line 2 - appended
Line 3 - appended again
----------------------------------
missing.txt does not exist.
Creating missing.txt...
missing.txt created successfully.
*/