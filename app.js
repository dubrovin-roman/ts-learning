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
const skills = ["dev", "devops"];
