"use strict";
class MyMap {
    constructor() {
        this.map = new Map();
    }
    static getInstance() {
        if (!MyMap.instance)
            MyMap.instance = new MyMap();
        return MyMap.instance;
    }
    clean() {
        this.map.clear();
    }
    setValue(key, value) {
        this.map.set(key, value);
    }
    getValue(key) {
        const value = this.map.get(key);
        if (!value)
            throw new Error(`Переданный ключ ${key} не существует!`);
        return value;
    }
    deleteValue(key) {
        return this.map.delete(key);
    }
}
class Service1 {
    setData(key, value) {
        MyMap.getInstance().setValue(key, value);
    }
}
class Service2 {
    getVal(key) {
        return MyMap.getInstance().getValue(key);
    }
    cleanData() {
        MyMap.getInstance().clean();
        console.log(MyMap.getInstance().map);
    }
}
new Service1().setData(1, "number 1");
new Service1().setData(2, "number 2");
console.log(new Service2().getVal(2));
new Service2().cleanData();
