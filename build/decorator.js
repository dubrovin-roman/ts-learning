"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//@nullUsersNum
// @threeUsersAdvanced
// @SetUsers(15)
let UserService = class UserService {
    constructor() {
        this.usersNumber = 1000;
    }
    getUsersNumInDB() {
        return this.usersNumber;
    }
};
UserService = __decorate([
    SetUsersAdvanced(20),
    CreatedAt
], UserService);
// в данном случае декоратор применяется до создания класса и после создания класса если в нем есть объявленные свойства их поменять неполучится
function nullUsersNum(target) {
    target.prototype.usersNumber = 0;
}
// а декоратор применяется уже после создания класса и тогда свойство не поменяется, здесь мы работаем уже с созданным классом
function threeUsersAdvanced(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.usersNumber = 3;
        }
    };
}
const userService = new UserService();
console.log(userService.getUsersNumInDB());
console.log(userService);
// фабрика
function SetUsers(numUsers) {
    return (target) => {
        target.prototype.usersNumber = numUsers;
    };
}
function SetUsersAdvanced(numUsers) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.usersNumber = numUsers;
            }
        };
    };
}
// 10.5 Упражнение - Декоратор CreatedAt
function CreatedAt(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.CreatedAt = new Date();
        }
    };
}
