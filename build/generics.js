"use strict";
const numArray = [1, 2, 3];
function logMiddleware(data) {
    console.log(data);
    return data;
}
// const result2 = logMiddleware<number>(1);
function getSplitedHalf(data) {
    const l = data.length;
    return data.splice(0, l);
}
// типизация функций generics, описание типов функций
const split = getSplitedHalf;
const logLine = {
    timeStamp: new Date(),
    data: {
        a: 1,
    },
};
function toString(data) {
    if (Array.isArray(data))
        return data.toString();
    switch (typeof data) {
        case "string":
            return data;
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
        case "function":
            return data.toString();
        case "object":
            return JSON.stringify(data);
        default:
            return undefined;
    }
}
console.log(toString("str"));
console.log(toString(true));
console.log(toString(123.23));
console.log(toString({ name: "Roman", surname: "Dubrovin" }));
console.log(toString(null));
const data = [
    { id: 2, name: "Петя" },
    { id: 1, name: "Вася" },
    { id: 3, name: "Надя" },
];
function sortObjById(data, inAscendingOrder) {
    if (inAscendingOrder) {
        data.sort((obj1, obj2) => obj1.id - obj2.id);
    }
    else {
        data.sort((obj1, obj2) => obj2.id - obj1.id);
    }
}
sortObjById(data, false);
console.log(data);
