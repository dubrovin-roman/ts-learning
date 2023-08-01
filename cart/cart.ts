enum DeliveryTo {
  HOME = "home",
  POINT_OF_ISSUE = "point_of_issue",
}

class Product {
  private _id: number;
  private _prodactName: string;
  private _productPrice: number;

  constructor(id: number, prodactName: string, productPrice: number) {
    this._id = id;
    this._prodactName = prodactName;
    this._productPrice = productPrice;
  }

  get id() {
    return this._id;
  }

  get productName() {
    return this._prodactName;
  }

  get productPrice() {
    return this._productPrice;
  }
}

class Delivery {
  deliveryTo: DeliveryTo;
  deliveryDate: Date;
  address: string;
  deliveryStoreId: number;
}

class Cart {
  products: Product[];
  deliveryOptions: Delivery;
}
