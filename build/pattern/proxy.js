"use strict";
class PaymentAPI {
    constructor() {
        this.db = [
            { id: 1, sum: 10000, from: "from", to: "to" },
        ];
    }
    getPaymentDetailsById(id) {
        return this.db.find((d) => d.id === id);
    }
}
class PaymentAccessProxy {
    constructor(api, userId) {
        this.api = api;
        this.userId = userId;
    }
    getPaymentDetailsById(id) {
        if (this.userId === 1) {
            return this.api.getPaymentDetailsById(id);
        }
        console.log("Несанкционированный доступ к платежу!");
        return undefined;
    }
}
function getPaymentDetails(api) {
    return api.getPaymentDetailsById(1);
}
const api = new PaymentAccessProxy(new PaymentAPI(), 2);
console.log(getPaymentDetails(api));
