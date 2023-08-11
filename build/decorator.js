"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
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
// console.log(userService.getUsersNumInDB());
// console.log(userService);
// console.log((userService as IUserService & CreatedAt).CreatedAt);
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
// 10.6 Декоратор метода
class UserServiceNew {
    // @Log
    getUsersNumInDB() {
        throw new Error("Method not implemented.");
    }
}
__decorate([
    Max(100),
    __metadata("design:type", Number)
], UserServiceNew.prototype, "usersNumber", void 0);
__decorate([
    LogError({ reThrow: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], UserServiceNew.prototype, "getUsersNumInDB", null);
function Log(target, propertyKey, descriptor) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
    descriptor.value = () => {
        console.log("no error");
    };
}
// 10.7 Упражнение - Декоратор перехвата ошибок
// для асинхронной функции
function LogErrorAsync({ reThrow } = { reThrow: false }) {
    return (target, _, descriptor) => {
        const originalFun = descriptor.value;
        descriptor.value = (...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!originalFun)
                    throw new Error("original function undefined");
                return yield originalFun.apply(target, args);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    if (reThrow)
                        throw error;
                }
            }
        });
    };
}
// для обычной функции
function LogError({ reThrow } = { reThrow: false }) {
    return (target, _, descriptor) => {
        const originalFun = descriptor.value;
        descriptor.value = (...args) => {
            try {
                if (!originalFun)
                    throw new Error("original function undefined");
                return originalFun.apply(target, args);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    if (reThrow)
                        throw error;
                }
            }
        };
    };
}
new UserServiceNew().getUsersNumInDB();
// 10.8 Декоратор свойства
function Max(maxValue) {
    return (target, propertyKey) => {
        let value;
        const setter = function (newValue) {
            if (newValue > maxValue) {
                console.log(`Нельзя установить значение больше ${maxValue}`);
            }
            else {
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
class UserServ {
    set usersNumber(num) {
        this._usersNumber = num;
    }
    get usersNumber() {
        return this._usersNumber;
    }
    getUsersNumInDB() {
        throw new Error("Method not implemented.");
    }
}
__decorate([
    LogSet(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], UserServ.prototype, "usersNumber", null);
function LogSet() {
    return (target, _, descriptor) => {
        const setFun = descriptor.set;
        descriptor.set = (...args) => {
            console.log(`Setter объекта вызван с параметрами: ${args}`);
            setFun === null || setFun === void 0 ? void 0 : setFun.apply(target, args);
        };
    };
}
const us1 = new UserServ();
us1.usersNumber = 100;
console.log(us1.usersNumber);
// 10.10 Декоратор параметра
// создаем ключ для своих метаданных
const POSITIVE_METADATA_KEY = Symbol("POSITIVE_METADATA_KEY");
class UserServiceNew2 {
    getUsersNumInDB() {
        return this.usersNumber;
    }
    setUsersNumInDB(num) {
        this.usersNumber = num;
    }
}
__decorate([
    Validate(),
    __param(0, Positive()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserServiceNew2.prototype, "setUsersNumInDB", null);
function Positive() {
    return (target, propertyKey, parameterIndex) => {
        // получаем метаданные
        console.log(Reflect.getOwnMetadata("design:type", target, propertyKey));
        console.log(Reflect.getOwnMetadata("design:paramtypes", target, propertyKey));
        console.log(Reflect.getOwnMetadata("design:returntype", target, propertyKey));
        // создаем свои метаданные
        let existParam = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
        existParam.push(parameterIndex);
        Reflect.defineMetadata(POSITIVE_METADATA_KEY, existParam, target, propertyKey);
    };
}
// 10.11 Метаданные
// делаем валидатор на основе добавленных нами метаданных
function Validate() {
    return (target, propertyKey, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            const positiveParam = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey);
            for (let index of positiveParam) {
                if (args[index] <= 0)
                    throw new Error("Число должно быть больше нуля");
            }
            return method === null || method === void 0 ? void 0 : method.apply(target, args);
        };
    };
}
const usn2 = new UserServiceNew2();
usn2.setUsersNumInDB(10);
console.log(usn2.getUsersNumInDB());
usn2.setUsersNumInDB(30);
console.log(usn2.getUsersNumInDB());
