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

// Class
abstract class User {
  constructor(
    // private로 정의했다면 상속받은 클래스에서는 접근하지 못한다
    // 때문에 User 클래스 안에서만 접근 가능
    private firstName: string,
    private lastName: string,
    public nick: string,
    // protected는 다른 클래스에서만 접근가능
    protected middleName: string
  ) {}
  // 추상 메소드
  abstract getNick(): void;
  private getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class ClassPlayer extends User {
  // 추상화 클래스에서 signature만 언급한 메소드를 정의해야한다

  getNick(): void {
    // nick 은 public으로 상속됐기 때문에 접근가능
    console.log(this.nick);

    // private로 상속되어져서 접근 불가능
    // console.log(this.firstName);

    // protected로 정의된거라서 접근 가능
    console.log(this.middleName);
  }
}

const pla = new ClassPlayer("nico", "las", "니꼬", "ddd");

// signature는 User 클래스에서 했으나, 정의는 상속된 클래스에서 했기 때문에 접근가능
pla.getNick();

// private로 정의된거라서 접근 불가능
// pla.firstName

// protected로 정의된거라서 접근 불가능
// pla.middleName

type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  // 클래스를 타입처럼 쓸수 있음
  add(word: Word) {
    // term과 def는 모두 public으로 선언되서 접근가능
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
}

class Word {
  constructor(public readonly term: string, public readonly def: string) {}
}

const kimchi = new Word("kimchi", "한국의 음식");
const dict = new Dict();

dict.add(kimchi); // => {"kimchi": "한국의 음식"}
dict.def("kimchi"); // => 한국의 음식

// def가 public으로 정의되었기에 이런식으로 적는게 가능
// 때문에 readonly를 추가한거임
// kimchi.def = "asdfasdf"

type Team = "red" | "blue" | "yellow";

type Health = 1 | 5 | 10;

// type과 interface의 공통점은 객체의 모양을 잡는거지만
// 차이점은 type이 좀더 범용성이 크다
// 즉 interface는 객체의 타입만을 정의한다
interface Play {
  nickname: string;
  team: Team;
  health: Health;
}

// interface도 상속 가능
interface AA extends Play {}

const Plad: AA = {
  nickname: "asdfasdf",
  team: "red",
  health: 5,
};
