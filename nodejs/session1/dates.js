const dayjs = require("dayjs");

console.log("Today's Date:", dayjs().format("DD MMM YYYY"));

console.log("Day of Week:", dayjs().format("dddd"));

console.log(
  "Next Week:",
  dayjs().add(7, "day").format("DD MMM YYYY")
);

console.log(
  "Is today before 2030?",
  dayjs().isBefore("2030-01-01")
);

/*
Today's Date: 04 Jul 2026
Day of Week: Saturday
Next Week: 11 Jul 2026
Is today before 2030? true
*/