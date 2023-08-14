class MyMap {
  private static instance: MyMap;

  map: Map<number, string> = new Map();

  private constructor() {}

  public static getInstance(): MyMap {
    if (!MyMap.instance) MyMap.instance = new MyMap();
    return MyMap.instance;
  }

  clean(): void {
    this.map.clear();
  }

  setValue(key: number, value: string): void {
    this.map.set(key, value);
  }

  getValue(key: number): string {
    const value = this.map.get(key);
    if (!value) throw new Error(`Переданный ключ ${key} не существует!`);
    return value;
  }

  deleteValue(key: number): boolean {
    return this.map.delete(key);
  }
}

class Service1 {
  setData(key: number, value: string): void {
    MyMap.getInstance().setValue(key, value);
  }
}

class Service2 {
  getVal(key: number): string {
    return MyMap.getInstance().getValue(key);
  }

  cleanData(): void {
    MyMap.getInstance().clean();
    console.log(MyMap.getInstance().map);
  }
}

new Service1().setData(1, "number 1");
new Service1().setData(2, "number 2");
console.log(new Service2().getVal(2));
new Service2().cleanData();