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
}
const myUser = new MyUser("Roma");
const myUser2 = new MyUser();
const myUser3 = new MyUser("Roman", 37);
const myUser4 = new MyUser(37);
console.log(myUser2);
console.log(myUser);
myUser.name = "Gretta";
console.log(myUser);
class MyAdmin {
}
const myAdmin = new MyAdmin();
myAdmin.role = "1";
console.log(myAdmin);
