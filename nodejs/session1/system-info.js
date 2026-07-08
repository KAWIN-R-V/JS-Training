const os = require("os");

console.log("Platform:", os.platform());

console.log("Architecture:", os.arch());

console.log("Hostname:", os.hostname());

console.log("Home directory:", os.homedir());

console.log("CPUs:", os.cpus().length);

console.log("Total memory (MB):", Math.round(os.totalmem() / 1024 / 1024));

console.log("Free memory (MB):", Math.round(os.freemem() / 1024 / 1024));



/*
Platform: win32
Architecture: x64
Hostname: LAPTOP-R4BQUFV6
Home directory: C:\Users\Kawin R V
CPUs: 16
Total memory (MB): 15674
Free memory (MB): 5607
*/