interface IPaymentAPI {
  getPaymentDetailsById(id: number): IPaymentDetails | undefined;
}

interface IPaymentDetails {
  id: number;
  sum: number;
  from: string;
  to: string;
}

class PaymentAPI implements IPaymentAPI {
  private db: IPaymentDetails[] = [
    { id: 1, sum: 10000, from: "from", to: "to" },
  ];

  getPaymentDetailsById(id: number): IPaymentDetails | undefined {
    return this.db.find((d) => d.id === id);
  }
}


class PaymentAccessProxy implements IPaymentAPI {
    constructor(private api: IPaymentAPI, private userId: number) {}
    
    getPaymentDetailsById(id: number): IPaymentDetails | undefined {
        if (this.userId === 1) {
            return this.api.getPaymentDetailsById(id);
        }
        console.log("Несанкционированный доступ к платежу!");
        return undefined;
    }
}

function getPaymentDetails(api: IPaymentAPI): IPaymentDetails | undefined {
    return api.getPaymentDetailsById(1);
}

const api = new PaymentAccessProxy(new PaymentAPI(), 2);
console.log(getPaymentDetails(api));