class MyUser {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const myUser = new MyUser("Roma");
console.log(myUser);
myUser.name = "Gretta";
console.log(myUser);

class MyAdmin {
    role: string;
}

const myAdmin = new MyAdmin();
myAdmin.role = "1";

console.log(myAdmin);