const fs = require("fs");
const path = require("path");

// Create the absolute path to data.json
const jsonPath = path.join(__dirname, "data.json");


const raw = fs.readFileSync(jsonPath, "utf8");

const data = JSON.parse(raw);

console.log("All Users:");
console.log(data.users);

console.log("\nFirst User:");
console.log(data.users[0].name);

const interns = data.users.filter(user => user.role === "intern");

console.log("\nInterns:");
console.log(interns.map(user => user.name));


/*
All Users:
[
  { id: 1, name: 'Rahul', role: 'intern' },
  { id: 2, name: 'Priya', role: 'intern' },
  { id: 3, name: 'Amit', role: 'intern' }
]

First User:
Rahul

Interns:
[ 'Rahul', 'Priya', 'Amit' ]
 */