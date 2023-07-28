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
