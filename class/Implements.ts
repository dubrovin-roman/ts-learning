interface ILogger {
    log(...args: string[]): void;
    error(...args: string[]): void;
}

class Logger implements ILogger {
    log(...args: string[]): void {
        console.log(args);
    }
    error(...args: string[]): void {
        // кинуть ошибку во внешнюю систему
        console.log(args);
    }
    
}

interface IPayable {
    pay(paymentId: number): void;
    price?: number;
}

interface IDeletable {
    delete(): void;
}

class UserImpl implements IPayable, IDeletable {
    pay(paymentId: number): void {
        // pay
    }
    //price?: number | undefined;
    delete(): void {
        // delete
    }
    
}