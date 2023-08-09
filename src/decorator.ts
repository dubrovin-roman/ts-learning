interface IUserService {
  usersNumber: number;
  getUsersNumInDB(): number;
}

//@nullUsersNum
// @threeUsersAdvanced
// @SetUsers(15)
@SetUsersAdvanced(20)
@CreatedAt
class UserService implements IUserService {
  usersNumber: number = 1000;
  getUsersNumInDB(): number {
    return this.usersNumber;
  }
}

// в данном случае декоратор применяется до создания класса и после создания класса если в нем есть объявленные свойства их поменять неполучится
function nullUsersNum(target: Function) {
  target.prototype.usersNumber = 0;
}

// а декоратор применяется уже после создания класса и тогда свойство не поменяется, здесь мы работаем уже с созданным классом
function threeUsersAdvanced<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    usersNumber = 3;
  };
}
const userService = new UserService();

console.log(userService.getUsersNumInDB());
console.log(userService);

// фабрика

function SetUsers(numUsers: number) {
  return (target: Function) => {
    target.prototype.usersNumber = numUsers;
  };
}

function SetUsersAdvanced(numUsers: number) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      usersNumber = numUsers;
    };
  };
}

// 10.5 Упражнение - Декоратор CreatedAt
function CreatedAt<T extends {new(...args: any[]):{}}>(constructor: T) {
    return class extends constructor {
        CreatedAt = new Date();
    }
}