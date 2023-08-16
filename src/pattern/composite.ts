abstract class DeliveryItem {
  public items: DeliveryItem[] = [];

  putItem(item: DeliveryItem) {
    this.items.push(item);
  }

  getSummPrice(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
  }

  abstract getPrice(): number;
}

export class DeliveryShop extends DeliveryItem {
  constructor(private deliveryFee: number) {
    super();
  }

  override getPrice(): number {
    return super.getSummPrice() + this.deliveryFee;
  }
}

export class Packaging extends DeliveryItem {
  constructor(private packagingPrice: number) {
    super();
  }

  override getPrice(): number {
    return super.getSummPrice() + this.packagingPrice;
  }
}

export class Product extends DeliveryItem {
    constructor(private productPrice: number) {
        super();
    }
    
    override getPrice(): number {
        return this.productPrice;
    }
}

const shop = new DeliveryShop(500);

const pack1 = new Packaging(100);
const pack2 = new Packaging(200);

const ssdProd = new Product(2_500);
const hddProd = new Product(1_000);
pack2.putItem(ssdProd);
pack2.putItem(hddProd);

const motherboardProd = new Product(10_000);
pack1.putItem(motherboardProd);

const iphonProd = new Product(100_000);

shop.putItem(iphonProd);
shop.putItem(pack1);
shop.putItem(pack2);

console.log(shop.getPrice());