const numArray: Array<number> = [1, 2, 3];

function logMiddleware<T>(data: T): T {
  console.log(data);
  return data;
}

// const result2 = logMiddleware<number>(1);

function getSplitedHalf<T>(data: Array<T>): Array<T> {
  const l = data.length;
  return data.splice(0, l);
}

// типизация функций generics, описание типов функций
const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf;

// generics в интерфейсах и Type
interface ILogLine<T> {
  timeStamp: Date;
  data: T;
}

type LogLineType<T> = {
  timeStamp: Date;
  data: T;
};

const logLine: LogLineType<{ a: number }> = {
  timeStamp: new Date(),
  data: {
    a: 1,
  },
};

function toString<T>(data: T): string | undefined {
  if (Array.isArray(data)) return data.toString();
  switch (typeof data) {
    case "string":
      return data;
    case "number":
    case "bigint":
    case "boolean":
    case "symbol":
    case "function":
      return data.toString();
    case "object":
      return JSON.stringify(data);
    default:
      return undefined;
  }
}

console.log(toString<string>("str"));
console.log(toString<boolean>(true));
console.log(toString<number>(123.23));
console.log(toString<object>({ name: "Roman", surname: "Dubrovin" }));
console.log(toString(null));
