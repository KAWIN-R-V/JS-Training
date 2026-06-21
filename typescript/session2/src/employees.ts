interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

interface Employee extends Person {
  readonly employeeId: string;
  department: string;
  startDate: Date;
}

interface Manager extends Employee {
  teamSize: number;
  directReports: string[];
}

function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${
    employee.department
  }, joined on ${employee.startDate.toLocaleDateString()}`;
}

const person: Person = {
  firstName: "Alice",
  lastName: "Smith",
  email: "alice@example.com"
};

const employee: Employee = {
  firstName: "Bob",
  lastName: "Johnson",
  email: "bob@example.com",
  employeeId: "EMP101",
  department: "Engineering",
  startDate: new Date("2024-01-01")
};

const manager: Manager = {
  firstName: "Carol",
  lastName: "Brown",
  email: "carol@example.com",
  employeeId: "MGR201",
  department: "IT",
  startDate: new Date("2023-06-01"),
  teamSize: 5,
  directReports: ["EMP101", "EMP102"]
};

console.log(getFullName(person));
console.log(getFullName(employee));
console.log(getFullName(manager));

console.log(introduceEmployee(employee));

/*
Employee and Manager extend Person.
Therefore they contain all Person properties.
*/