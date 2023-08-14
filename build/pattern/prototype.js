"use strict";
class UserHistory {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    clone() {
        let target = new UserHistory(this.name, this.email);
        target.createdAt = this.createdAt;
        return target;
    }
}
const myHistory = new UserHistory("Roman", "my_email@yandex.ru");
console.log(myHistory);
const cloneMyHistory = myHistory.clone();
console.log(cloneMyHistory);
