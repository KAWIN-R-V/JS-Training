const path = require("path");

console.log("Directory name:", __dirname);

console.log("File name:", __filename);

const joined = path.join(__dirname, "data", "users.json");
console.log("Joined path:", joined);

console.log("Extension:", path.extname("index.html"));

console.log("Basename:", path.basename("/users/rahul/notes.txt"));

console.log("Dirname:", path.dirname("/users/rahul/notes.txt"));

/*
Why use path.join() instead of string concatenation?
1. It automatically uses the correct path separator  (Windows uses '\' while Linux/macOS use '/').
2. It prevents duplicate or missing slashes.
3. It makes the code portable across different operating systems.

Example:

Bad:
__dirname + "/data/users.json"

Good:
path.join(__dirname, "data", "users.json")
*/

/*
Directory name: C:\Users\Kawin R V\JS_Training\nodejs\session1
File name: C:\Users\Kawin R V\JS_Training\nodejs\session1\path.js
Joined path: C:\Users\Kawin R V\JS_Training\nodejs\session1\data\users.json
Extension: .html
Basename: notes.txt
Dirname: /users/rahul
*/