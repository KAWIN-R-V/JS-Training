// json-demo.js

const fs = require("fs");
const path = require("path");

// Create the absolute path to data.json
const filePath = path.join(__dirname, "data.json");

/*
--------------------------------------------------
Read and Parse JSON
--------------------------------------------------
*/

// Read the JSON file as text
const raw = fs.readFileSync(filePath, "utf8");

/*
JSON.parse()

Converts a JSON string into a JavaScript object or array.

Without JSON.parse(), the data would remain a plain string,
and you could not access properties like user.name or user.score.
*/
let users = JSON.parse(raw);

console.log("========== ALL USERS ==========");
console.log(users);

console.log("\nTotal Users:", users.length);

// Filter users with score >= 90
const topScorers = users.filter(user => user.score >= 90);

console.log("\nTop Scorers:");
console.log(topScorers.map(user => user.name));

// Calculate average score
const average =
    users.reduce((sum, user) => sum + user.score, 0) /
    users.length;

console.log("\nAverage Score:", average.toFixed(1));

console.log("----------------------------------");

/*
--------------------------------------------------
Add a New User
--------------------------------------------------
*/

const newUser = {
    id: 5,
    name: "Vikram",
    role: "intern",
    score: 88
};

// Prevent duplicate entries if the script is run multiple times
const exists = users.some(user => user.id === newUser.id);

if (!exists) {
    users.push(newUser);

    fs.writeFileSync(
        filePath,
        JSON.stringify(users, null, 2)
    );

    console.log("User added successfully.");
} else {
    console.log("Vikram already exists.");
}

// Verify
const verify = JSON.parse(
    fs.readFileSync(filePath, "utf8")
);

console.log("Total after update:", verify.length);

console.log("----------------------------------");

/*
--------------------------------------------------
Update Amit's Score
--------------------------------------------------
*/

const currentData = JSON.parse(
    fs.readFileSync(filePath, "utf8")
);

const index = currentData.findIndex(
    user => user.name === "Amit"
);

if (index !== -1) {

    currentData[index].score = 90;

    fs.writeFileSync(
        filePath,
        JSON.stringify(currentData, null, 2)
    );

    console.log("Amit's score updated to 90.");
}

console.log("----------------------------------");

/*

Top Scorers:
[ 'Priya', 'Sneha' ]

Average Score: 87.5
----------------------------------
User added successfully.
Total after update: 5
----------------------------------
Amit's score updated to 90.
----------------------------------
*/