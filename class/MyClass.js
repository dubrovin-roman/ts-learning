"use strict";
class MyUser {
    constructor(name) {
        this.name = name;
    }
}
const myUser = new MyUser("Roma");
console.log(myUser);
myUser.name = "Gretta";
console.log(myUser);
class MyAdmin {
}
const myAdmin = new MyAdmin();
myAdmin.role = "1";
console.log(myAdmin);
