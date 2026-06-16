 //Activity 1 - Async Behaviour
 

console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");

// Because setTimeout executes asynchronously.

console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");


// Even with 0ms, callback goes to Web API queue
// and runs after current code finishes.

console.log("Fetching data...");
setTimeout(() => {
    console.log("Data received!");
}, 2000);



 //Activity 2 - Promises
 

const getData = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;

    setTimeout(() => {
        if (success)
            resolve("Data loaded!");
        else
            reject("Something went wrong");
    }, 1000);
});

getData
    .then(data => console.log("Success:", data))
    .catch(error => console.log("Error:", error));


// Promise Chain

const startValue = new Promise((resolve) => resolve(5));

startValue
    .then(value => value * 2)
    .then(value => value + 10)
    .then(result => console.log("Final Result:", result));


// Promise.all

const promise1 = new Promise((resolve) =>
    setTimeout(() => resolve("User loaded"), 1000)
);

const promise2 = new Promise((resolve) =>
    setTimeout(() => resolve("Orders loaded"), 1500)
);

Promise.all([promise1, promise2])
    .then(results => console.log(results))
    .catch(error => console.log(error));



 //Activity 3 - Async / Await
 
async function fetchUserName() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        const user = await response.json();

        console.log(user.name);
    } catch (error) {
        console.log(error);
    }
}

fetchUserName();


// getUserById

const getUserById = async (id) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        return {
            name: user.name,
            email: user.email
        };
    } catch (error) {
        console.log(error);
    }
};

getUserById(3).then(data => console.log(data));


// getAllUsers

const getAllUsers = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();

        return users.map(user => ({
            name: user.name,
            email: user.email
        }));
    } catch (error) {
        console.log(error);
    }
};

getAllUsers().then(users => console.log(users));



 //Activity 4 - Error Handling
 
const fetchUser = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log("Error:", error.message);
    }
};

fetchUser();


// 404 Handling

const fetchMissing = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/99999"
        );

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log("Caught:", error.message);
    }
};

fetchMissing();


// Promise.allSettled

Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users/1"),
    fetch("https://invalid-url.com")
])
.then(results => {
    console.log(results);
});



 //Activity 5 - DOM Manipulation
 

const title = document.getElementById("title");
title.textContent = "Hello, Intern!";

const subtitle = document.getElementById("subtitle");
subtitle.style.color = "blue";

const counter = document.getElementById("counter");

let count = Number(counter.textContent);
count++;

counter.textContent = count;


// Render Names

const names = ["Alice", "Bob", "Carol"];

const userList = document.getElementById("user-list");

names.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    userList.appendChild(li);
});


// classList Example

function toggleTitleClass() {
    title.classList.toggle("highlight");
}

toggleTitleClass();



 //Activity 6 - Events
 

const greetBtn = document.getElementById("greet-btn");
const addBtn = document.getElementById("add-btn");
const resetBtn = document.getElementById("reset-btn");
const nameInput = document.getElementById("name-input");
const greeting = document.getElementById("greeting");
const clickCount = document.getElementById("click-count");


// Greeting Function

function greetUser() {
    const name = nameInput.value.trim();

    if (name === "") {
        greeting.textContent = "Please enter a name";
    } else {
        greeting.textContent = `Hello, ${name}!`;
    }
}

greetBtn.addEventListener("click", greetUser);


// Click Counter

let clicks = 0;

addBtn.addEventListener("click", () => {
    clicks++;
    clickCount.textContent = `Clicks: ${clicks}`;
});

resetBtn.addEventListener("click", () => {
    clicks = 0;
    clickCount.textContent = `Clicks: ${clicks}`;
});


// Live Input

nameInput.addEventListener("input", () => {
    greeting.textContent = `Hello, ${nameInput.value}`;
});


// Enter Key

nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        greetUser();
    }
});



 //Activity 7 - Fetch + DOM
 

const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const usersContainer = document.getElementById("users-container");
const searchInput = document.getElementById("search");

let loadedUsers = [];

function renderUsers(users) {
    usersContainer.innerHTML = "";

    users.forEach(user => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
            <hr>
        `;

        usersContainer.appendChild(div);
    });
}

loadBtn.addEventListener("click", async () => {

    try {
        statusText.textContent = "Loading...";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();

        loadedUsers = users;

        renderUsers(users);

        statusText.textContent =
            `${users.length} users loaded`;

    } catch (error) {

        statusText.textContent =
            "Failed to load users. Try again.";

        usersContainer.innerHTML = "";
    }
});


// Search Users

searchInput.addEventListener("input", () => {

    const searchText =
        searchInput.value.toLowerCase();

    const filteredUsers =
        loadedUsers.filter(user =>
            user.name.toLowerCase()
            .includes(searchText)
        );

    renderUsers(filteredUsers);
});



 //Activity 8 - Self Learn

async function userAndPosts() {

    const [userRes, postRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users/1"),
        fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    ]);

    const user = await userRes.json();
    const posts = await postRes.json();

    console.log(
        `${user.name} has ${posts.length} posts`
    );
}

userAndPosts();


// localStorage Example

localStorage.setItem(
    "sampleUsers",
    JSON.stringify(["Alice", "Bob"])
);

const savedUsers =
    JSON.parse(localStorage.getItem("sampleUsers"));

console.log(savedUsers);