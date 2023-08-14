interface IInsurance {
  id: number;
  status: string;
  setCar(car: any): void;
  submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
  id: number;
  status: string;
  private car: any;

  setCar(car: any): void {
    this.car = car;
  }

  async submit(): Promise<boolean> {
    const res = await fetch("tf.ru", {
      method: "POST",
      body: JSON.stringify({ car: this.car }),
    });
    const data = await res.json();
    return data.isSuccess;
  }
}

class ABInsurance implements IInsurance {
  id: number;
  status: string;
  private car: any;
  setCar(car: any): void {
    this.car = car;
  }
  async submit(): Promise<boolean> {
    const res = await fetch("ab.ru", {
      method: "POST",
      body: JSON.stringify({ car: this.car }),
    });
    const data = await res.json();
    return data.isSuccess;
  }
}

abstract class InsuranceFactory {
  db: any;

  abstract createFactory(): IInsurance;

  saveHistory(ins: IInsurance): void {
    this.db.save(ins.id, ins.status);
  }
}

class TFInsuranceFactory extends InsuranceFactory {
  override createFactory(): TFInsurance {
    return new TFInsurance();
  }
}

class ABInsuranceFactory extends InsuranceFactory {
  override createFactory(): ABInsurance {
    return new ABInsurance();
  }
}

const tfInsuranceFactory = new TFInsuranceFactory();
const insurance = tfInsuranceFactory.createFactory();
tfInsuranceFactory.saveHistory(insurance);

// альтернативный метод создания фабрики

const INSURANCE_TYPE = {
  tf: TFInsurance,
  ab: ABInsurance,
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
  db: any;

  createInsurance<T extends keyof IT>(type: T): IT[T] {
    return INSURANCE_TYPE[type];
  }

  saveHistory(ins: IInsurance): void {
    this.db.save(ins.id, ins.status);
  }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt();
const ins = new (insuranceFactoryAlt.createInsurance("tf"))();
insuranceFactoryAlt.saveHistory(ins);
