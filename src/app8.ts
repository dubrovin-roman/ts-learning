// 8  Манипуляция с типами
// 8.2 Keyof

interface IUser {
  name: string;
  age: number;
}

const user8: IUser = {
  name: "Roman",
  age: 37,
};

type KeysOfIuser = keyof IUser;

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

console.log(getValue(user8, "name"));

//8.3 Упражнение - Пишем функцию группировки

const data8 = [
  { group: 1, name: "b" },
  { group: 1, name: "a" },
  { group: 2, name: "c" },
];

function groupBy<T, K extends keyof T>(data: T[], key: K): Record<string, T[]> {
  const resultObj: Record<string, T[]> = {};
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (!element) continue;
    const value: string = `${element[key]}`;

    value in resultObj
      ? resultObj[value]?.push(element)
      : (resultObj[value] = [element]);
  }
  return resultObj;
}

console.log(groupBy(data8, "name"));

// 8.4 Typeof

let strOrNumb: string | number;

if (Math.random() > 0.5) {
  strOrNumb = 5;
} else {
  strOrNumb = "str";
}

if (typeof strOrNumb === "string") {
  console.log(strOrNumb);
} else if (typeof strOrNumb === "number") {
  console.log(strOrNumb);
}

let strOrNumb2: typeof strOrNumb;

// typeof & keyof

const user81 = {
  name: "Roman",
  age: 37,
  city: "Kislovodsk",
};

type keyOfUser = keyof typeof user81;

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

type direc = keyof typeof Direction;

const direcUp = Direction["UP"];

// 8.5 Indexed Access Types

interface IRole8 {
  nameRole: string;
}

interface IUser8 {
  name: string;
  roles: IRole8[];
}

const user82: IUser8 = {
  name: "Roman",
  roles: [{ nameRole: "Admin" }],
};

const userName = user82["name"];

type rolesType = IUser8["roles"];

// обращение к элементу массива типов

type roleType = IUser8["roles"][number];

// преобразование массива с значениями к типу с летералами этих значений

const roles = ["user", "admin", "super-user"] as const;

type roleTypes = (typeof roles)[number];

// 8.6 Conditional Types

interface HTTPResponse<T extends "success" | "failed"> {
  code: number;
  data: T extends "success" ? string : Error;
  data2: T extends "success" ? string : number;
}

// conditional в перегрузке методов

class UserClass {
  id: number;
  name: string;
}

class UserPersistenClass {
  dbId: string;
}

function getUser(id: number): UserClass;
function getUser(dbId: string): UserPersistenClass;
function getUser(idOrDbId: number | string): UserClass | UserPersistenClass {
  if (typeof idOrDbId === "number") {
    return new UserClass();
  } else {
    return new UserPersistenClass();
  }
}

type UserOrUserPersistenType<T extends string | number> = T extends number
  ? UserClass
  : UserPersistenClass;

function getUserCond<T extends string | number>(
  idOrDbId: T
): UserOrUserPersistenType<T> {
  if (typeof idOrDbId === "number") {
    return new UserClass() as UserOrUserPersistenType<T>;
  } else {
    return new UserPersistenClass() as UserOrUserPersistenType<T>;
  }
}

console.log(getUserCond(1));
console.log(getUserCond("str"));

// 8.8 Mapped Types

type Modifier = "read" | "update" | "create";

type UserRoles = {
  customers?: Modifier;
  projects?: Modifier;
  adminPanel?: Modifier;
};
// как не надо
type UserAccess1 = {
  customers?: boolean;
  projects?: boolean;
  adminPanel?: boolean;
};

type ModifierToAccess<Type> = {
  +readonly [Property in keyof Type as `canAccess${string &
    Property}`]-?: boolean;
};
// как надо
type UserAccess2 = ModifierToAccess<UserRoles>;

// 8.9 Упражнение - Валидация форм
// необходимо сделать тип для результата валидации формы, основываясь на типе формы

interface IForm {
  name: string;
  password: string;
}

const form: IForm = {
  name: "Roman",
  password: "123",
};

type FormToValidation<T> = {
  [Key in keyof T]:
    | { isValid: true }
    | { isValid: false; errorMessage: string };
};

const formValidation: FormToValidation<IForm> = {
  name: { isValid: true },
  password: { isValid: false, errorMessage: "Должен быть длиннее 5 символов" },
};

// 8.11 Template Literal Types

type ReadOrWrite = "read" | "write";
type Bulk = "bulk" | "";

type Access = `can${Capitalize<ReadOrWrite>}${Capitalize<Bulk>}`;

// реальный пример
type ErrorOrSuccess = "error" | "success";

type ResponseT = {
  result: `http${Capitalize<ErrorOrSuccess>}`;
};

const res8: ResponseT = {
  result: "httpSuccess",
};

// распаковка типа с помощью infer выделения типа, убираем "can"

type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

type T = ReadOrWriteBulk<Access>;