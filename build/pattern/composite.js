"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Packaging = exports.DeliveryShop = void 0;
class DeliveryItem {
    constructor() {
        this.items = [];
    }
    putItem(item) {
        this.items.push(item);
    }
    getSummPrice() {
        return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
    }
}
class DeliveryShop extends DeliveryItem {
    constructor(deliveryFee) {
        super();
        this.deliveryFee = deliveryFee;
    }
    getPrice() {
        return super.getSummPrice() + this.deliveryFee;
    }
}
exports.DeliveryShop = DeliveryShop;
class Packaging extends DeliveryItem {
    constructor(packagingPrice) {
        super();
        this.packagingPrice = packagingPrice;
    }
    getPrice() {
        return super.getSummPrice() + this.packagingPrice;
    }
}
exports.Packaging = Packaging;
class Product extends DeliveryItem {
    constructor(productPrice) {
        super();
        this.productPrice = productPrice;
    }
    getPrice() {
        return this.productPrice;
    }
}
exports.Product = Product;
const shop = new DeliveryShop(500);
const pack1 = new Packaging(100);
const pack2 = new Packaging(200);
const ssdProd = new Product(2500);
const hddProd = new Product(1000);
pack2.putItem(ssdProd);
pack2.putItem(hddProd);
const motherboardProd = new Product(10000);
pack1.putItem(motherboardProd);
const iphonProd = new Product(100000);
shop.putItem(iphonProd);
shop.putItem(pack1);
shop.putItem(pack2);
console.log(shop.getPrice());
