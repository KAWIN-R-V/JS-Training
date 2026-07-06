// os-demo.js

// Import the built-in os module
const os = require("os");

// Returns the operating system platform (win32, linux, darwin, etc.)
// Useful for writing platform-specific code.
console.log("Platform:", os.platform());

// Returns the CPU architecture (x64, arm64, etc.)
// Useful for checking hardware compatibility.
console.log("Architecture:", os.arch());

// Returns the computer's hostname.
// Useful for identifying the machine on a network.
console.log("Hostname:", os.hostname());

// Returns the current user's home directory.
// Useful for locating user-specific files.
console.log("Home directory:", os.homedir());

// Returns the number of logical CPU cores.
// Useful for optimizing applications that use multiple threads.
console.log("CPU cores:", os.cpus().length);

// Calculate total and free memory in MB
const totalMB = Math.round(os.totalmem() / 1024 / 1024);
const freeMB = Math.round(os.freemem() / 1024 / 1024);

// Displays the available and total system memory.
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`);

console.log("----------------------------------");

// Detect the operating system
const platform = os.platform();

if (platform === "win32") {
    console.log("Running on Windows");
} else if (platform === "darwin") {
    console.log("Running on Mac");
} else {
    console.log("Running on Linux");
}

// Calculate free memory percentage
const freePercent = Math.round((os.freemem() / os.totalmem()) * 100);

if (freePercent < 20) {
    console.log(`Warning: Low memory - ${freePercent}% free`);
} else {
    console.log(`Memory OK - ${freePercent}% free`);
}

/*
Platform: win32
Architecture: x64
Hostname: LAPTOP-R4BQUFV6
Home directory: C:\Users\Kawin R V
CPU cores: 16
Memory: 4514MB free of 15674MB
----------------------------------
Running on Windows
Memory OK - 29% free
*/