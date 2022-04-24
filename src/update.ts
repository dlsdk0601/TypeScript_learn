type Age = number;
type Name = string;

//객체에 타입 설정하는 방법
type Player = {
  readonly name: Name;
  age?: Age; //옵션값
};

const person: Player = {
  name: "tom",
};

// readonly 때문에 이름을 못바꿈
// person.name = "aaaa"

const person2: Player = {
  name: "sven",
  age: 31,
};

//function에서 type 설정법
// function palyerMeker(name: string): Player {
//   return {
//     name,
//   };
// }

//Arrow function에서 type 설정법
const palyerMeker = (name: string): Player => ({ name });

const ina = palyerMeker("ina");
ina.age = 31;

// Tuple
const player: readonly [string, number, boolean] = ["nico", 1, true];

// readonly 때문에 어떤 요소도 못바꿈
// playe[0] = "hi"

// any
// 타입스크립트를 탈출하는 타입인데, 자주 쓰면 치명적이니 자주 쓰지말것.
let a: any = [];
