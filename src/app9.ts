// 9.2 Partial, Required, Readonly

interface IUser9 {
  name: string;
  age?: number;
  email: string;
}

type partial = Partial<IUser9>;

type required = Required<IUser9>;

type readonly = Readonly<IUser9>;

type requiredAndReadonly = Required<Readonly<IUser9>>;

// 9.3 Pick, Omit, Extract, Exclude

interface IPaymentPersistent {
  id: number;
  sum: number;
  from: string;
  to: string;
}

type PaymentType = Omit<IPaymentPersistent, "id">;
type PaymentRequisits = Pick<IPaymentPersistent, "from" | "to">;

type ExtractEx = Extract<"from" | "to" | PaymentType, string>;
type ExcludeEx = Exclude<"from" | "to" | PaymentType, string>;

// 9.4 ReturnType, Parameters, ConstructorParameters

class User9 {
    constructor(public id: number, public name: string) {

    }
}

function getUser9(id: number): User9 {
    return new User9(id, "Roman");
}

type RT = ReturnType<typeof getUser9>;
type RT1 = ReturnType<() => void>;
type RT2 = ReturnType<<T>() => T>;
type RT3 = ReturnType<<T extends string | number>() => T>;

type PT = Parameters<typeof getUser9>;
type PT1 = Parameters<typeof getUser9>[0];

type CT = ConstructorParameters<typeof User9>;