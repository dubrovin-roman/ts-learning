enum MyPaymentStatus {
  HOLDED,
  PROCESSED,
  REVERSED,
}

class Payment {
  id: number;
  status: MyPaymentStatus = MyPaymentStatus.HOLDED;
  createdAt: Date = new Date();
  updatedAt: Date;

  constructor(id: number) {
    this.id = id;
  }

  getPaymentLifeTime(): number {
    return new Date().getTime() - this.createdAt.getTime();
  }

  unholdPayment(): void {
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
  payment.unholdPayment();
  console.log(payment);
}, 1000);
