//js에 적용하지 못하는 인터페이스, 이걸로 다른 오브젝트와 비교하여 타입이 잘 되어있는지 확인 시켜준다 
interface Human {
   name:string;
   age: number;
   gender: string;
}


//js에서도 쓸 수 있는 class
class Human1 {
   //public은 전역으로 쓸수 있고, private는 안에서만 쓸수있따
   public name: string;
   public age: number;
   public gender: string;
   constructor(name: string, age: number, gender?:string){
      this.name = name;
      this.age = age;
      this.gender = gender;
   }
}

const lynn = new Human1("Lynn", 18, "female");

const person = {
   name: "nico",
   age: 28,
   gender: "male"
};

 const sayHi = (name:string, age:number, gender:string): void => {  
     //?는 옵션이라는 말임. 있어도 없어도 됨
    //void는 빈공간을 의미함 이때는 return 이 없지만 
    //무엇을 return 할지에 따라 void자리에 string, number 등 해줘야함
    
    console.log(`hello ${name}, you are ${age}, you are a good ${gender}`)
 }

 const sayHi1 = (name:string, age:number, gender:string): string => {  
   
   return `hello ${name}, you are ${age}, you are a ${gender}`;
}

const sayHi2 = (person: Human): string => {
   //person이 human의 인터페이스 처럼 돼있는지 확인 후 적용
   
   return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
}



sayHi("aaa", 25, "male");
console.log(sayHi1("aaa", 25, "male"));
console.log(sayHi2(person));
console.log(sayHi2(lynn));

 export {};