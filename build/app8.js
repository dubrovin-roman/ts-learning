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
