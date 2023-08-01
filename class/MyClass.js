"use strict";
var _MyUser_password;
class MyUser {
    constructor(nameOrAge, age) {
        this.name = "default";
        _MyUser_password.set(this, void 0);
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
    get login() {
        return this._login;
    }
    set login(l) {
        this._login = `user-${l}`;
    }
}
_MyUser_password = new WeakMap();
const myUser = new MyUser("Roma");
const myUser2 = new MyUser();
const myUser3 = new MyUser("Roman", 37);
const myUser4 = new MyUser(37);
myUser.addSkill(["dev", "devops"]);
myUser.login = "roman";
console.log(myUser.login);
console.log(myUser);
myUser.addSkill(["tester"]);
console.log(myUser);
myUser.addSkill("ks");
console.log(myUser);
class MyAdmin {
}
const myAdmin = new MyAdmin();
myAdmin.role = "1";
