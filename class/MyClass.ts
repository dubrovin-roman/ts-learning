class MyUser {
  name: string = "default";
  age: number;
  skills: string[];
  private _login: string;
  #password: string;

  constructor();
  constructor(name: string);
  constructor(age: number);
  constructor(name: string, age: number);
  constructor(nameOrAge?: string | number, age?: number) {
    if (typeof nameOrAge === "string") this.name = nameOrAge;
    if (typeof nameOrAge === "number") this.age = nameOrAge;
    if (typeof age === "number") this.age = age;
  }

  addSkill(skill: string): void;
  addSkill(skills: string[]): void;
  addSkill(skillOrSkills: string | string[]): void {
    if (typeof skillOrSkills === "string") this.skills.push(skillOrSkills);
    if (
      Array.isArray(skillOrSkills) &&
      skillOrSkills.length != 0 &&
      typeof skillOrSkills[0] === "string"
    ) {
      if (!this.skills) this.skills = [];
      this.skills = this.skills.concat(skillOrSkills);
    }
  }

  get login(): string {
    return this._login;
  }

  set login(l: string) {
    this._login = `user-${l}`;
  }
}

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
  role: string;
}

const myAdmin = new MyAdmin();
myAdmin.role = "1";