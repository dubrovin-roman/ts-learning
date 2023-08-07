"use strict";
// 8  Манипуляция с типами
// 8.2 Keyof
const user8 = {
    name: "Roman",
    age: 37,
};
function getValue(obj, key) {
    return obj[key];
}
console.log(getValue(user8, "name"));
//8.3 Упражнение - Пишем функцию группировки
const data8 = [
    { group: 1, name: "b" },
    { group: 1, name: "a" },
    { group: 2, name: "c" },
];
function groupBy(data, key) {
    var _a;
    const resultObj = {};
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (!element)
            continue;
        const value = `${element[key]}`;
        value in resultObj
            ? (_a = resultObj[value]) === null || _a === void 0 ? void 0 : _a.push(element)
            : (resultObj[value] = [element]);
    }
    return resultObj;
}
console.log(groupBy(data8, "name"));
// 8.4 Typeof
let strOrNumb;
if (Math.random() > 0.5) {
    strOrNumb = 5;
}
else {
    strOrNumb = "str";
}
if (typeof strOrNumb === "string") {
    console.log(strOrNumb);
}
else if (typeof strOrNumb === "number") {
    console.log(strOrNumb);
}
let strOrNumb2;
// typeof & keyof
const user81 = {
    name: "Roman",
    age: 37,
    city: "Kislovodsk",
};
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
const direcUp = Direction["UP"];
const user82 = {
    name: "Roman",
    roles: [{ nameRole: "Admin" }],
};
const userName = user82["name"];
// преобразование массива с значениями к типу с летералами этих значений
const roles = ["user", "admin", "super-user"];
// conditional в перегрузке методов
class UserClass {
}
class UserPersistenClass {
}
function getUser(idOrDbId) {
    if (typeof idOrDbId === "number") {
        return new UserClass();
    }
    else {
        return new UserPersistenClass();
    }
}
function getUserCond(idOrDbId) {
    if (typeof idOrDbId === "number") {
        return new UserClass();
    }
    else {
        return new UserPersistenClass();
    }
}
console.log(getUserCond(1));
console.log(getUserCond("str"));
