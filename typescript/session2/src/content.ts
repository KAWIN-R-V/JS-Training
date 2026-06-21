import {
  slugify,
  truncate
} from "./helpers";

const slug = slugify(
  "Hello World"
);

const shortText = truncate(
  "This is a long text for testing TypeScript",
  15
);

console.log(slug);

console.log(shortText);

/*
When helpers.js is used:

TypeScript may have limited type information.

After converting to helpers.ts:

TypeScript understands:
- parameter types
- return types
- autocomplete
- error checking
*/