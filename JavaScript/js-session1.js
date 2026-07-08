console.log("Hello");

const name="Kawin R V";
const age=21;
let role="Graduate Intern";
let isAvailable=true;
console.log("name is a "+typeof name);
console.log("age is a "+typeof age);

//age = 22;
//console.log("age is a "+typeof age);

console.log(`Hi, I'm ${name} and I'm a ${role}.`);
console.log(`Available: ${isAvailable}`);
console.log(`My name has ${name.length} characters.`);

const fullName=(first,last)=>`${first} ${last}`;
console.log(fullName("Kawin","R V"));
const isAdult=(age)=>age>=18;
console.log(isAdult(20));
const formatUser=(user)=>`${user.name} - ${user.role}`;
const User={
    name:"Kawin R V",
    role:"developer"
};
console.log(formatUser(User));


const user = {
  id: 1,
  name: "Dharshan",
  role: "dev",
  active: true,
  address: {
    city: "Tamilnadu",
    country: "India"
  }
};
const{name :userName,role:userRole,active}=user;
console.log(userName);
console.log(userRole);
console.log(active);
const{address:{city}}=user;
console.log(city);
const updatedUser={...user,active:false};
console.log(updatedUser);


const devs = ["kawi", "Dhars"];
const designers = ["Olivia", "Liza"];
const team=[...devs,...designers];
console.log(team);
const updateTeam=[...team,"Eva"];
console.log(updateTeam);
const {firstmember,secondmember}=team;
console.log(firstmember);
console.log(secondmember);


const users = [
  { id: 1, name: "Bob", role: "dev",    active: true  },
  { id: 2, name: "Oliver",   role: "design", active: false },
  { id: 3, name: "Carol", role: "dev",    active: true  },
  { id: 4, name: "Oliver",   role: "design", active: true  },
  { id: 5, name: "Liz",   role: "dev",    active: false },
];
const activeUsers=users.filter(user=>user.active).map(user=>user.name);
console.log(activeUsers);
const devUsers=users.filter(user=>user.role ==="dev");
console.log(devUsers);
const description=users.map(user=>`${user.name} is a ${user.role}`);
console.log(description);
const activeDevs=users.filter(user=>user.active && user.role==="dev").map(user=>user.name);
console.log(activeDevs);


const Users = [
  { id: 1, name: "Bob", role: "dev",    active: true  },
  { id: 2, name: "Oliver",   role: "design", active: false },
  { id: 3, name: "Carol", role: "dev",    active: true  },
  { id: 4, name: "Oliver",   role: "design", active: true  },
  { id: 5, name: "Liz",   role: "dev",    active: false },
];
const roleCount=users.reduce((count,user)=>{
    count[user.role]=(count[user.role]||0)+1;
    return count;
},{});
console.log(roleCount);
const activeDesigner=users.find(user=>user.active && user.role==="design");
console.log(activeDesigner);
const hasInactiveuser=users.some(user=>!user.active);
console.log(hasInactiveuser);
const allHaveRole=users.every(user=>user.role);
console.log(allHaveRole);


const input = "5";
const score = 5;
if (input == score) {
  console.log("match");   
};

const doubled = [1, 2, 3].map(n => {
  return n * 2;
});

const original = [1, 2, 3];
const updated=[...original,4];
console.log(updated);
console.log(original);

const user1 = { name: "Elizabeth", active: true };
user1.active = false ;   
console.log(user1);

const Username = "Kawi";
const username = "Dhars";
console.log(Username);
console.log(username);
const a = null;
const b = undefined;
console.log(typeof a);
console.log(typeof b);

const greet = (name) => `Hello, ${name}`;
console.log(greet("KAWIN"));
