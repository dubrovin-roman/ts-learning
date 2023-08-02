enum DeliveryTo {
  HOME = "home",
  POINT_OF_ISSUE = "point_of_issue",
}

class Product {
  private _id: number;
  private _productName: string;
  private _productPrice: number;

  constructor(id: number, prodactName: string, productPrice: number) {
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
  private _deliveryTo: DeliveryTo;
  private _deliveryDate: Date;
  private _address: string;
  private _deliveryStoreId: number;

  constructor(deliveryStoreId: number);
  constructor(address: string, deliveryDate: Date);
  constructor(deliveryStoreIdOrAddress: number | string, deliveryDate?: Date) {
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
  private _products: Product[] = [];
  private _deliveryOptions: Delivery;

  constructor() {}

  get products() {
    return this._products;
  }

  get deliveryOptions() {
    return this._deliveryOptions;
  }

  addProductToCart(product: Product): this {
    this._products.push(product);
    return this;
  }

  deleteProductFromCartById(productId: number): void {
    this._products = this._products.filter((prod) => prod.id != productId);
  }

  getSummAllProducts(): number {
    let summ = 0;
    this._products.forEach((prod) => (summ += prod.productPrice));
    return this.roundNumber(summ, 2);
  }

  setDelivery(deliveryStoreId: number): void;
  setDelivery(address: string, deliveryDate: Date): void;
  setDelivery(
    deliveryStoreIdOrAddress: number | string,
    deliveryDate?: Date
  ): void {
    if (typeof deliveryStoreIdOrAddress === "number") {
      this._deliveryOptions = new Delivery(deliveryStoreIdOrAddress);
    }
    if (typeof deliveryStoreIdOrAddress === "string" && deliveryDate) {
      this._deliveryOptions = new Delivery(
        deliveryStoreIdOrAddress,
        deliveryDate
      );
    }
  }

  checkout(): boolean {
    if (this._products.length != 0 && this._deliveryOptions) {
      return true;
    } else {
      return false;
    }
  }

  private roundNumber(num: number, digits: number): number {
    const multiple = Math.pow(10, digits);
    return Math.round(num * multiple) / multiple;
  }
}

const prod1 = new Product(1, "ЖК Монитор", 31_500.5);
const prod2 = new Product(2, "Корпус ПК", 2_000.8);
const prod3 = new Product(3, "HDD", 3_000.8);
const prod4 = new Product(4, "SSD", 6_000.8);
const prod5 = new Product(5, "Материнска плата", 10_000.8);
const prod6 = new Product(6, "Процессор", 15_000.8);
const prod7 = new Product(7, "Оперативная память", 6_000.8);

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
