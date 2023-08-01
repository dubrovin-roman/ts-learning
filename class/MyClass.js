"use strict";
class MyUser {
    constructor(nameOrAge, age) {
        this.name = "default";
        if (typeof nameOrAge === "string")
            this.name = nameOrAge;
        if (typeof nameOrAge === "number")
            this.age = nameOrAge;
        if (typeof age === "number")
            this.age = age;
    }
    addSkill(skillOrSkills) {
        if (typeof skillOrSkills === "string")
            this.skills.push(skillOrSkills);
        if (Array.isArray(skillOrSkills) &&
            skillOrSkills.length != 0 &&
            typeof skillOrSkills[0] === "string") {
            if (!this.skills)
                this.skills = [];
            this.skills = this.skills.concat(skillOrSkills);
        }
    }
}
const myUser = new MyUser("Roma");
const myUser2 = new MyUser();
const myUser3 = new MyUser("Roman", 37);
const myUser4 = new MyUser(37);
myUser.addSkill(["dev", "devops"]);
console.log(myUser);
myUser.addSkill(["tester"]);
console.log(myUser);
myUser.addSkill("ks");
console.log(myUser);
class MyAdmin {
}
const myAdmin = new MyAdmin();
myAdmin.role = "1";
