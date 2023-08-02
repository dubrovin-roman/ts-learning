"use strict";
class Logger {
    log(...args) {
        console.log(args);
    }
    error(...args) {
        // кинуть ошибку во внешнюю систему
        console.log(args);
    }
}
class UserImpl {
    pay(paymentId) {
        // pay
    }
    //price?: number | undefined;
    delete() {
        // delete
    }
}
