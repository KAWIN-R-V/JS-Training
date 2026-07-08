// path-demo.js

// Import the built-in path module
const path = require("path");

// __dirname returns the absolute path of the current folder.
// Useful when accessing files relative to the current script.
console.log("Current directory:", __dirname);

// __filename returns the absolute path of the current file.
// Useful for debugging or locating the running script.
console.log("Current file:", __filename);

// path.join() safely joins multiple path segments.
// It automatically uses the correct path separator for the operating system.
const filePath = path.join(__dirname, "data", "users.json");
console.log("Joined path:", filePath);

// Returns only the filename from a full path.
console.log("Basename:", path.basename("/home/user/notes.txt"));

// Returns the extension of a file.
console.log("Extension:", path.extname("index.html"));

// Returns only the directory part of a path.
console.log("Dirname:", path.dirname("/home/user/notes.txt"));

console.log("----------------------------------");

// Manual string concatenation (not recommended)
const manual = __dirname + "/data/users.json";
console.log("Manual Path:", manual);

// Safe path construction using path.join()
const joined = path.join(__dirname, "data", "users.json");
console.log("path.join():", joined);

// path.resolve() returns an absolute path.
// If given a relative path, it resolves it from the current working directory.
const resolved = path.resolve("data", "users.json");
console.log("path.resolve():", resolved);

/*
Difference between path.join() and path.resolve()

path.join():
- Joins path segments together.
- Does not necessarily return an absolute path unless one of the segments is absolute.
- Best used when building paths relative to __dirname.

Example:
path.join(__dirname, "data", "users.json")

path.resolve():
- Resolves a sequence of paths into an absolute path.
- Starts from the current working directory if no absolute path is provided.
- Useful when an absolute path is required.

In most Node.js projects, path.join(__dirname, ...) is preferred
for locating project files because it works consistently regardless
of where the script is executed.
*/

/*
Current directory: C:\Users\Kawin R V\JS_Training\nodejs\session2
Current file: C:\Users\Kawin R V\JS_Training\nodejs\session2\path-demo.js
Joined path: C:\Users\Kawin R V\JS_Training\nodejs\session2\data\users.json
Basename: notes.txt
Extension: .html
Dirname: /home/user
----------------------------------
Manual Path: C:\Users\Kawin R V\JS_Training\nodejs\session2/data/users.json
path.join(): C:\Users\Kawin R V\JS_Training\nodejs\session2\data\users.json
path.resolve(): C:\Users\Kawin R V\JS_Training\nodejs\session2\data\users.json
*/