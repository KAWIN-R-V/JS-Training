const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

const filePath = path.join(__dirname, "data.json");

const rawData = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(rawData);

const role = process.argv[2];

if (!role) {
    console.log("Usage: node report.js <role>");
    console.log("Example: node report.js intern");
    process.exit(1);
}

const matchedUsers = data.users.filter(
    user => user.role.toLowerCase() === role.toLowerCase()
);

console.log("==================================");
console.log("        USER REPORT");
console.log("==================================");
console.log("Report generated on:", dayjs().format("DD MMM YYYY"));
console.log("Role:", role);
console.log("----------------------------------");

if (matchedUsers.length === 0) {
    console.log("No users found for this role.");
} else {
    matchedUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (ID: ${user.id})`);
    });
}

console.log("----------------------------------");
console.log(`Total: ${matchedUsers.length} user(s) found`);
console.log("==================================");


/*
PS C:\Users\Kawin R V\JS_Training\nodejs\session1> node report.js intern

==================================
        USER REPORT
==================================
Report generated on: 04 Jul 2026
Role: intern
----------------------------------
1. Rahul (ID: 1)
2. Priya (ID: 2)
3. Amit (ID: 3)
----------------------------------
Total: 3 user(s) found
==================================
*/