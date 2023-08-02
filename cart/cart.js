"use strict";
var DeliveryTo;
(function (DeliveryTo) {
    DeliveryTo["HOME"] = "home";
    DeliveryTo["POINT_OF_ISSUE"] = "point_of_issue";
})(DeliveryTo || (DeliveryTo = {}));
class Product {
    constructor(id, prodactName, productPrice) {
        this._id = id;
        this._productName = prodactName;
        this._productPrice = productPrice;
    }
    get id() {
        return this._id;
    }
    get productName() {
        return this._productName;
    }
    get productPrice() {
        return this._productPrice;
    }
}
class Delivery {
    constructor(deliveryStoreIdOrAddress, deliveryDate) {
        if (typeof deliveryStoreIdOrAddress === "number") {
            this._deliveryTo = DeliveryTo.POINT_OF_ISSUE;
            this._deliveryDate = new Date();
            this._deliveryStoreId = deliveryStoreIdOrAddress;
        }
        if (typeof deliveryStoreIdOrAddress === "string" && deliveryDate) {
            this._deliveryTo = DeliveryTo.HOME;
            this._deliveryDate = deliveryDate;
            this._address = deliveryStoreIdOrAddress;
        }
    }
}
class Cart {
    constructor() {
        this._products = [];
    }
    get products() {
        return this._products;
    }
    get deliveryOptions() {
        return this._deliveryOptions;
    }
    addProductToCart(product) {
        this._products.push(product);
        return this;
    }
    deleteProductFromCartById(productId) {
        this._products = this._products.filter((prod) => prod.id != productId);
    }
    getSummAllProducts() {
        let summ = 0;
        this._products.forEach((prod) => (summ += prod.productPrice));
        return this.roundNumber(summ, 2);
    }
    setDelivery(deliveryStoreIdOrAddress, deliveryDate) {
        if (typeof deliveryStoreIdOrAddress === "number") {
            this._deliveryOptions = new Delivery(deliveryStoreIdOrAddress);
        }
        if (typeof deliveryStoreIdOrAddress === "string" && deliveryDate) {
            this._deliveryOptions = new Delivery(deliveryStoreIdOrAddress, deliveryDate);
        }
    }
    checkout() {
        if (this._products.length != 0 && this._deliveryOptions) {
            return true;
        }
        else {
            return false;
        }
    }
    roundNumber(num, digits) {
        const multiple = Math.pow(10, digits);
        return Math.round(num * multiple) / multiple;
    }
}
const prod1 = new Product(1, "ЖК Монитор", 31500.5);
const prod2 = new Product(2, "Корпус ПК", 2000.8);
const prod3 = new Product(3, "HDD", 3000.8);
const prod4 = new Product(4, "SSD", 6000.8);
const prod5 = new Product(5, "Материнска плата", 10000.8);
const prod6 = new Product(6, "Процессор", 15000.8);
const prod7 = new Product(7, "Оперативная память", 6000.8);
const cart1 = new Cart();
cart1
    .addProductToCart(prod1)
    .addProductToCart(prod2)
    .addProductToCart(prod3)
    .addProductToCart(prod4)
    .addProductToCart(prod5)
    .addProductToCart(prod6)
    .addProductToCart(prod7);
cart1.deleteProductFromCartById(3);
console.log(cart1.products);
console.log(cart1.getSummAllProducts());
console.log(cart1.checkout());
cart1.setDelivery("address", new Date(2023, 11, 31));
console.log(cart1.checkout());
console.log(cart1.deliveryOptions);
