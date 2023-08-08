"use strict";
// 9.2 Partial, Required, Readonly
// 9.4 ReturnType, Parameters, ConstructorParameters
class User9 {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
function getUser9(id) {
    return new User9(id, "Roman");
}
