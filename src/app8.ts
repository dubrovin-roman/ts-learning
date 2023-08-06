// 8  Манипуляция с типами
// 8.2 Keyof

interface IUser {
  name: string;
  age: number;
}

const user8: IUser = {
  name: "Roman",
  age: 37,
};

type KeysOfIuser = keyof IUser;

function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

console.log(getValue(user8, "name"));

//8.3 Упражнение - Пишем функцию группировки

function groupBy<T, K extends keyof T>(data: T[], key: K) {
    const resultObj = {};
    
    return resultObj;
}