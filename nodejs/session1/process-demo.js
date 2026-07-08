console.log("Node version:", process.version)
console.log("Platform:", process.platform)
console.log("Current directory:", process.cwd())
console.log("Memory usage:", process.memoryUsage())

/*
Node version: v24.16.0
Platform: win32
Current directory: C:\Users\Kawin R V\JS_Training\nodejs\session1
Memory usage: {
  rss: 36085760,
  heapTotal: 6496256,
  heapUsed: 4784616,
  external: 1773498,
  arrayBuffers: 22815
*/

const args = process.argv
console.log("All arguments:", args)
console.log("Your input:", args[2])

/*
All arguments: [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Kawin R V\\JS_Training\\nodejs\\session1\\process-demo.js'
]
*/

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);

/*
Environment variables are used to store sensitive information such as
database URLs, API keys, and passwords outside the source code.
This improves security because secrets are not exposed in the project files
or version control systems like Git.
*/