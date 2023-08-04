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
// типизация функций generics
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
