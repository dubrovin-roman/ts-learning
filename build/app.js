"use strict";
let revenue = 10000;
let bonus = 5000;
let res = revenue + bonus;
console.log(res);
function getFullName(firstName, lastName) {
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
function getFullNameFromUserEntity(userEntity) {
    return `${userEntity.firstname} ${userEntity.surname} from ${userEntity.city}, age ${userEntity.age}`;
}
console.log(getFullNameFromUserEntity(user));
// ------------------ МАССИВЫ ---------------------------
const skills = ["dev", "devops", "testing"];
skills.forEach((skill) => console.log(skill.toLocaleUpperCase()));
const res1 = skills
    .filter((s) => s !== "dev")
    .map((s) => s.toLocaleUpperCase() + " ")
    .reduce((s1, s2) => s1 + s2)
    .trim();
console.log(res1);
// ----------------- TUPLES (КОРТЕЖИ) ---------------------
const skill = [1, "dev"];
const [id, skillName] = skill;
console.log(id);
console.log(skillName);
const arr = [1, "dev", true, true, false];
// --------------------- readonly for array and tuples ----------------------- //
const skill2 = [1, "dev"];
const arr1 = [1, 2, 3];
// используем джинерик
const skills2 = ["dev", "devops"];
const skills3 = ["dev", "devops"];
// --------------------- UNION ----------------------------------------//
function logIn(id) {
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
function fetchWithAuth(url, method) {
    return -1;
}
fetchWithAuth("url", "get");
fetchWithAuth("url", "post");
const a = "1";
function fetchWithAliase(url, method) {
    console.log(url);
    console.log(method);
}
fetchWithAliase("url", "post");
const userA = {
    id: 777,
    name: "Roman",
    age: 37,
    skills: ["dev", "devops"],
};
const user2 = {
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
function genereateError(message) {
    throw new Error(message);
}
function dumpError() {
    while (true) {
        // .....
    }
}
function rec() {
    return rec();
}
function processAction(action) {
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
            const _nev = action;
            throw new Error(`Нет такого ${action}`);
    }
}
function isString(data) {
    if (typeof data === "string") {
        return true;
    }
    else if (typeof data === "number") {
        return false;
    }
    genereateError("передан некорректный тип данных");
}
// ------------------------ TYPE GUARD ---------------------- //
function isStringTG(x) {
    return typeof x === "string";
}
function logId(id) {
    if (isStringTG(id)) {
        console.log(id);
    }
}
const usertg = {
    name: "Roman",
    email: "roman@yandex.ru",
    login: "roman",
};
function isAdmin(user) {
    return "role" in user;
}
function isAdminAlternative(user) {
    return user.role !== undefined;
}
function setRoleZero(user) {
    if (isAdmin(user)) {
        user.role = 0;
    }
    else {
        throw new Error("Пользователь не админ");
    }
}
const ob = { name: "Иван" };
assertUser(ob);
ob.name = "Вася";
function assertUser(obj) {
    if (typeof obj === "object" && !!obj && "name" in obj) {
        return;
    }
    throw new Error("Not USER");
}
