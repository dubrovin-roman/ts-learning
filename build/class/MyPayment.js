"use strict";
var MyPaymentStatus;
(function (MyPaymentStatus) {
    MyPaymentStatus[MyPaymentStatus["HOLDED"] = 0] = "HOLDED";
    MyPaymentStatus[MyPaymentStatus["PROCESSED"] = 1] = "PROCESSED";
    MyPaymentStatus[MyPaymentStatus["REVERSED"] = 2] = "REVERSED";
})(MyPaymentStatus || (MyPaymentStatus = {}));
class Payment {
    constructor(id) {
        this.status = MyPaymentStatus.HOLDED;
        this.createdAt = new Date();
        this.id = id;
    }
    getPaymentLifeTime() {
        return new Date().getTime() - this.createdAt.getTime();
    }
    unholdPayment() {
        if (this.status == MyPaymentStatus.PROCESSED)
            throw new Error("Платеж не может быть возвращен.");
        this.status = MyPaymentStatus.REVERSED;
        this.updatedAt = new Date();
    }
}
const payment = new Payment(1);
setTimeout(() => {
    const lifeTime = payment.getPaymentLifeTime();
    console.log(lifeTime);
    // payment.status = MyPaymentStatus.PROCESSED;
    payment.unholdPayment();
    console.log(payment);
}, 1000);
