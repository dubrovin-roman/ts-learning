let revenue: number = 10_000;
let bonus: number = 5_000;

let res: number = revenue + bonus;

console.log(res);

function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

console.log(getFullName("Roman", "Dubrovin"));

const user = {
  firstname: "Roman",
  surname: "Dubrovin",
  city: "Kislovodsk",
  age: 37,
  skills: {
    dev: true,
    devops: true,
  },
};

function getFullNameFromUserEntity(userEntity: {
  firstname: string;
  surname: string;
  city: string;
  age: number;
}): string {
  return `${userEntity.firstname} ${userEntity.surname} from ${userEntity.city}, age ${userEntity.age}`;
}

console.log(getFullNameFromUserEntity(user));

// ------------------ МАССИВЫ ---------------------------

const skills: string[] = ["dev", "devops", "testing"];

skills.forEach((skill) => console.log(skill.toLocaleUpperCase()));

const res1 = skills
  .filter((s) => s !== "dev")
  .map((s) => s.toLocaleUpperCase() + " ")
  .reduce((s1, s2) => s1 + s2)
  .trim();

console.log(res1);

// ----------------- TUPLES (КОРТЕЖИ) ---------------------

const skill: [number, string] = [1, "dev"];
const [id, skillName] = skill;
console.log(id);
console.log(skillName);

const arr: [number, string, ...boolean[]] = [1, "dev", true, true, false];

// --------------------- readonly for array and tuples ----------------------- //

const skill2: readonly [number, string] = [1, "dev"];
const arr1: readonly number[] = [1, 2, 3];

// используем джинерик

const skills2: Array<string> = ["dev", "devops"];
const skills3: ReadonlyArray<string> = ["dev", "devops"];

// --------------------- UNION ----------------------------------------//

function logIn(id: number | string | boolean) {
  if (typeof id === "string") {
    console.log(id.toLocaleUpperCase());
  }
  if (typeof id === "number") {
    console.log(Number(id.toFixed(0)));
  }
  if (typeof id === "boolean") {
    console.log(id);
  }
}

logIn(123.23);
logIn("string");
logIn(true);

// --------------- Literal Types ------------------- //

function fetchWithAuth(url: string, method: "get" | "post"): 1 | -1 {
  return -1;
}

fetchWithAuth("url", "get");
fetchWithAuth("url", "post");

const a = "1";

// -------------------- Type Aliases -------------------- //

type httpMethod = "get" | "post";

function fetchWithAliase(url: string, method: httpMethod) {
  console.log(url);
  console.log(method);
}

fetchWithAliase("url", "post");

type User = {
  name: string;
  age: number;
  skills: string[];
};

type RoleA = {
  id: number;
};

type UserWithRole = User & RoleA;

const userA: UserWithRole = {
  id: 777,
  name: "Roman",
  age: 37,
  skills: ["dev", "devops"],
};

// ------------------ INTERFACE ----------------- //

interface UserI {
  name: string;
  age: number;
  skills: string[];
  getBirthYear: () => number;
}

interface UserWithRoleI extends UserI {
  roleId: number;
  dateCreate: Date;
}

const user2: UserWithRoleI = {
  roleId: 1,
  dateCreate: new Date(),
  name: "Roman",
  age: 37,
  skills: ["dev", "devops"],
  getBirthYear() {
    return 2023 - this.age;
  },
};
// --------------------------- NEVER ----------------------- //

function genereateError(message: string): never {
  throw new Error(message);
}

function dumpError(): never {
  while (true) {
    // .....
  }
}

function rec(): never {
  return rec();
}

type paymentAction = "refund" | "checkout" | "reject";

function processAction(action: paymentAction) {
  switch (action) {
    case "refund":
      // ....
      break;
    case "checkout":
      // ...
      break;
    case "reject":
      // ...
      break;
    default:
      const _nev: never = action;
      throw new Error(`Нет такого ${action}`);
  }
}

function isString(data: string | number): boolean {
  if (typeof data === "string") {
    return true;
  } else if (typeof data === "number") {
    return false;
  }
  genereateError("передан некорректный тип данных");
}

// ------------------------ TYPE GUARD ---------------------- //

function isStringTG(x: string | number): x is string {
  return typeof x === "string";
}

function logId(id: string | number) {
  if (isStringTG(id)) {
    console.log(id);
  }
}

interface UserTG {
  name: string;
  email: string;
  login: string;
}

interface Admin {
  name: string;
  role: number;
}

const usertg: UserTG = {
  name: "Roman",
  email: "roman@yandex.ru",
  login: "roman",
};

function isAdmin(user: UserTG | Admin): user is Admin {
  return "role" in user;
}

function isAdminAlternative(user: UserTG | Admin): user is Admin {
  return (user as Admin).role !== undefined;
}

function setRoleZero(user: UserTG | Admin) {
  if (isAdmin(user)) {
    user.role = 0;
  } else {
    throw new Error("Пользователь не админ");
  }
}

// ----------------- Asserts ------------------ //

interface UserA {
  name: string;
}

const ob = {name: "Иван"};

assertUser(ob);
ob.name = "Вася";

function assertUser(obj: unknown): asserts obj is UserA {
  if (typeof obj === "object" && !!obj && "name" in obj) {
    return;
  }
  throw new Error("Not USER");
}