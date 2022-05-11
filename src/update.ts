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
let arr: any = [];

// unknown;
let a: unknown;

if (typeof a === "number") {
  let b = a + 1;
}

if (typeof a === "string") {
  let b = a.toUpperCase();
}

// void
// void는 자동으로 알기때문에 굳이 설정 필요 x
function hello(): void {
  console.log("x");
}

// never
// 절대 return 하지 않을때

function ex(): never {
  throw new Error("xxxx");
}

function hi(name: string | number) {
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    name;
    // name이 숫자 아니면 문자라고 해놓고 예외를 두면 never로 잡힘
  }
}

// call Signiture
type ADD = (a: number, b: number) => number;
const add: ADD = (a, b) => a + b;

type SuperPrint = {
  //  ==> concreate type
  // (arr: number[]): void;
  // (arr: boolean[]): void;
  // (arr: string[]): void;

  //  ==> generic
  // 이 경우는 파라미터로 받은 인자로 타입을 추측해서 사용
  // 이름은 상관없고 앞뒤로 같은 이름으로 설정해주면됨

  // ==> return된값도 받아오고싶으면 이런식으로 하면됨
  <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder;

  // <TypePlaceholder>(arr: TypePlaceholder[]): void;
};

// const superPrint: SuperPrint = (arr) => arr[0];

// 함수 선언과 동시에 generic 설정 하는 방법
function superPrint<T>(arr: T[]) {
  return arr[0];
}

const aa = superPrint([1, 2, 3]);
const bb = superPrint([true, false, false]);
const cc = superPrint(["aaaa", "ddd", "dddd"]);
const dd = superPrint([1, 2, true, false, "sssss"]);

// 제네릭을 함수형 말고 쓰는 방법
type OnePlayer<E> = {
  name: string;
  extraInfo: E;
};

type Nico = {
  favFood: string;
};

type NicoPlayer = OnePlayer<Nico>;

const nico: NicoPlayer = {
  name: "nico",
  extraInfo: {
    favFood: "kimchi",
  },
};

const lynn: OnePlayer<null> = {
  name: "lynn",
  extraInfo: null,
};

type A = Array<number>;

let arr1: A = [1, 2, 3, 4];

function printAllNumbers(arr: Array<number>) {}
