interface Prototype<T> {
  clone(): T;
}

class UserHistory implements Prototype<UserHistory> {
  createdAt: Date;

  constructor(public name: string, public email: string) {
    this.createdAt = new Date();
  }
  
  clone(): UserHistory {
    let target = new UserHistory(this.name, this.email);
    target.createdAt = this.createdAt;
    return target;
  }
}

const myHistory = new UserHistory("Roman", "my_email@yandex.ru");
console.log(myHistory);
const cloneMyHistory = myHistory.clone();
console.log(cloneMyHistory);
