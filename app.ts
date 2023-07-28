let revenue: number = 10_000;
let bonus: number = 5_000;

let res: number = revenue + bonus;

console.log(res);

function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

console.log(getFullName("Roman", "Dubrovin"));

const user = {
  firstname: "Roman",
  surname: "Dubrovin",
  city: "Kislovodsk",
  age: 37,
  skills: {
    dev: true,
    devops: true,
  },
};

function getFullNameFromUserEntity(userEntity: {
  firstname: string;
  surname: string;
  city: string;
  age: number;
}): string {
  return `${userEntity.firstname} ${userEntity.surname} from ${userEntity.city}, age ${userEntity.age}`;
}

console.log(getFullNameFromUserEntity(user));

// ------------------ МАССИВЫ ---------------------------

const skills: string[] = ["dev", "devops"];