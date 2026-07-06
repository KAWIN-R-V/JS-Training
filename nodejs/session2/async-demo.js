// async-demo.js

// Import required built-in modules
const fs = require("fs");
const path = require("path");

// Path to output.txt
const filePath = path.join(__dirname, "output.txt");

/*
--------------------------------------------------
Synchronous File Read
--------------------------------------------------
The program waits until the file is completely read
before executing the next line.
*/

console.log("1 - Before synchronous read");

const data = fs.readFileSync(filePath, "utf8");

console.log(
    "2 - Synchronous read completed:",
    data.split("\n").length,
    "lines"
);

console.log("3 - After synchronous read");

console.log("----------------------------------");

/*
--------------------------------------------------
Asynchronous File Read
--------------------------------------------------
The program starts reading the file in the background.
It immediately continues executing the next statements
without waiting for the file read to finish.
*/

console.log("4 - Before asynchronous read");

fs.readFile(filePath, "utf8", (err, data) => {

    if (err) {
        console.error(err);
        return;
    }

    console.log(
        "6 - Asynchronous read completed:",
        data.split("\n").length,
        "lines"
    );

});

console.log("5 - After asynchronous read (does not wait)");

/*
--------------------------------------------------
Why is the order different?

Synchronous:
1 -> 2 -> 3

The program waits until the file has been read.

Asynchronous:
4 -> 5 -> 6

The file is read in the background while the
program continues executing other code.

--------------------------------------------------
Why does this matter?

Node.js servers often handle many users at the same time.

If synchronous file reading is used frequently,
every request must wait until the current file
operation finishes.

Asynchronous operations allow the server to continue
handling other requests while waiting for slow tasks
such as reading files or querying databases.

This makes Node.js fast and scalable.
*/


/*
1 - Before synchronous read
2 - Synchronous read completed: 3 lines
3 - After synchronous read
----------------------------------
4 - Before asynchronous read
5 - After asynchronous read (does not wait)
6 - Asynchronous read completed: 3 lines
*/