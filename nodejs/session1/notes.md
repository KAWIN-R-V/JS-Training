# NOTES.md

# package.json Fields

## name
The name of the Node.js project.

## version
Represents the current version of the project.

## description
A short explanation of what the project does.

## main
Specifies the main JavaScript file of the project.

## scripts
Defines shortcuts for running commands using npm.

Example:
npm start
npm run hello
npm run info

## author
The name of the project author.

## license
Specifies how others can use the project.

## dependencies
Packages required for the application to run.

Example:
dayjs

## devDependencies
Packages needed only during development.

Example:
nodemon

---

# Why npm Scripts are Useful

npm scripts provide simple shortcuts for running commands.

Instead of typing:

node dates.js

you can simply run:

npm start

In team projects, everyone runs the same commands, making development easier and reducing mistakes.

---

# dependencies vs devDependencies

dependencies

- Required for the application to run.
- Installed in production.

Examples:
- express
- dayjs
- react

devDependencies

- Required only while developing the application.
- Not needed in production.

Examples:
- nodemon
- eslint
- prettier

nodemon belongs in devDependencies because it automatically restarts the server during development and is not required after deployment.

---

# package.json vs package-lock.json

package.json

- Lists project information.
- Lists package names.
- Allows version ranges.

package-lock.json

- Stores the exact versions of every installed package.
- Ensures every developer installs the same package versions.
- Makes builds more reliable and reproducible.

---

# npm install vs npm ci

npm install

- Installs packages.
- Updates package-lock.json if necessary.
- Used during normal development.

npm ci

- Installs packages exactly as specified in package-lock.json.
- Deletes existing node_modules before installing.
- Faster than npm install.
- Mainly used in Continuous Integration (CI) environments.