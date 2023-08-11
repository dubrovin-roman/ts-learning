import "reflect-metadata";

interface IUserService {
  usersNumber: number;
  getUsersNumInDB(): number;
}

type CreatedAt = {
  CreatedAt: Date;
};

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

// console.log(userService.getUsersNumInDB());
// console.log(userService);
// console.log((userService as IUserService & CreatedAt).CreatedAt);

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
function CreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    CreatedAt = new Date();
  };
}

// 10.6 Декоратор метода

class UserServiceNew implements IUserService {
  @Max(100)
  usersNumber: number;

  // @Log
  @LogError({ reThrow: false })
  getUsersNumInDB(): number {
    throw new Error("Method not implemented.");
  }
}

function Log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
  descriptor.value = () => {
    console.log("no error");
  };
}

// 10.7 Упражнение - Декоратор перехвата ошибок
// для асинхронной функции
function LogErrorAsync({ reThrow }: { reThrow: boolean } = { reThrow: false }) {
  return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const originalFun = descriptor.value;
    descriptor.value = async (...args: any[]) => {
      try {
        if (!originalFun) throw new Error("original function undefined");
        return await originalFun.apply(target, args);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          if (reThrow) throw error;
        }
      }
    };
  };
}

// для обычной функции
function LogError({ reThrow }: { reThrow: boolean } = { reThrow: false }) {
  return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const originalFun = descriptor.value;
    descriptor.value = (...args: any[]) => {
      try {
        if (!originalFun) throw new Error("original function undefined");
        return originalFun.apply(target, args);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          if (reThrow) throw error;
        }
      }
    };
  };
}

new UserServiceNew().getUsersNumInDB();

// 10.8 Декоратор свойства

function Max(maxValue: number) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: number;

    const setter = function (newValue: number) {
      if (newValue > maxValue) {
        console.log(`Нельзя установить значение больше ${maxValue}`);
      } else {
        value = newValue;
      }
    };

    const getter = function () {
      return value;
    };

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
    });
  };
}

const us = new UserServiceNew();
us.usersNumber = 50;
console.log(us.usersNumber);
us.usersNumber = 200;
console.log(us.usersNumber);

// 10.9 Декоратор accessor

class UserServ implements IUserService {
  private _usersNumber: number;

  @LogSet()
  set usersNumber(num: number) {
    this._usersNumber = num;
  }

  get usersNumber() {
    return this._usersNumber;
  }

  getUsersNumInDB(): number {
    throw new Error("Method not implemented.");
  }
}

function LogSet() {
  return (
    target: Object,
    _: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const setFun = descriptor.set;
    descriptor.set = (...args: any) => {
      console.log(`Setter объекта вызван с параметрами: ${args}`);
      setFun?.apply(target, args);
    };
  };
}

const us1 = new UserServ();
us1.usersNumber = 100;
console.log(us1.usersNumber);

// 10.10 Декоратор параметра

// создаем ключ для своих метаданных
const POSITIVE_METADATA_KEY = Symbol("POSITIVE_METADATA_KEY");

class UserServiceNew2 implements IUserService {
  usersNumber: number;

  getUsersNumInDB(): number {
    return this.usersNumber;
  }

  @Validate()
  setUsersNumInDB(@Positive() num: number): void {
    this.usersNumber = num;
  }
}

function Positive() {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    // получаем метаданные
    console.log(Reflect.getOwnMetadata("design:type", target, propertyKey));
    console.log(
      Reflect.getOwnMetadata("design:paramtypes", target, propertyKey)
    );
    console.log(
      Reflect.getOwnMetadata("design:returntype", target, propertyKey)
    );
    // создаем свои метаданные
    let existParam: number[] =
      Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
    existParam.push(parameterIndex);
    Reflect.defineMetadata(
      POSITIVE_METADATA_KEY,
      existParam,
      target,
      propertyKey
    );
  };
}

// 10.11 Метаданные
// делаем валидатор на основе добавленных нами метаданных
function Validate() {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const method = descriptor.value;
    descriptor.value = function (...args: any) {
      const positiveParam: number[] = Reflect.getOwnMetadata(
        POSITIVE_METADATA_KEY,
        target,
        propertyKey
      );
      for (let index of positiveParam) {
        if (args[index] <= 0) throw new Error("Число должно быть больше нуля")
      }
      return method?.apply(target, args);
    }
  };
}

const usn2 = new UserServiceNew2();
usn2.setUsersNumInDB(10);
console.log(usn2.getUsersNumInDB());
usn2.setUsersNumInDB(30);
console.log(usn2.getUsersNumInDB());
