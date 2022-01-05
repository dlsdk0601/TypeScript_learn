
//--------------이론

// //js에 적용하지 못하는 인터페이스, 이걸로 다른 오브젝트와 비교하여 타입이 잘 되어있는지 확인 시켜준다 
// interface Human {
//    name:string;
//    age: number;
//    gender: string;
// }


// //js에서도 쓸 수 있는 class
// class Human1 {
//    //public은 전역으로 쓸수 있고, private는 안에서만 쓸수있따
//    public name: string;
//    public age: number;
//    public gender: string;
//    constructor(name: string, age: number, gender?:string){
//       this.name = name;
//       this.age = age;
//       this.gender = gender;
//    }
// }

// const lynn = new Human1("Lynn", 18, "female");

// const person = {
//    name: "nico",
//    age: 28,
//    gender: "male"
// };

//  const sayHi = (name:string, age:number, gender:string): void => {  
//      //?는 옵션이라는 말임. 있어도 없어도 됨
//     //void는 빈공간을 의미함 이때는 return 이 없지만 
//     //무엇을 return 할지에 따라 void자리에 string, number 등 해줘야함
    
//     console.log(`hello ${name}, you are ${age}, you are a good ${gender}`)
//  }

//  const sayHi1 = (name:string, age:number, gender:string): string => {  
   
//    return `hello ${name}, you are ${age}, you are a ${gender}`;
// }

// const sayHi2 = (person: Human): string => {
//    //person이 human의 인터페이스 처럼 돼있는지 확인 후 적용
   
//    return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
// }



// sayHi("aaa", 25, "male");
// console.log(sayHi1("aaa", 25, "male"));
// console.log(sayHi2(person));
// console.log(sayHi2(lynn));

//---------------------------블록체인
import * as CryptoJs from "crypto-js";

class Block{

   static calculateblockHash = (
      index: number, 
      previousHash: string, 
      timestamp: number, 
      data: string
      ): string => CryptoJs.SHA256(index + previousHash + timestamp + data).toString();

   static validateStructure = (aBlock: Block) : boolean => 
      typeof aBlock.index === "number" && 
      typeof aBlock.hash === "string" && 
      typeof aBlock.previousHash === "string" &&
      typeof aBlock.timestamp === "number" &&
      typeof aBlock.data === "string";
   
   public index:number;
   public hash: string;
   public previousHash: string;
   public data: string;
   public timestamp: number;

   constructor(index:number, hash: string, previousHash: string, data: string, timestamp: number,){
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
   }
}

//static으로 정의 했기에 이렇게 쓸수 있따.
// Block.calculateblockHash()

const genesisBlock:Block = new Block(0, "2020202020", "", "Hello", 123456);

let blockchain: [Block] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
   const previousBlock : Block = getLatestBlock();
   const newIndex : number = previousBlock.index + 1;
   const newTimestamp : number = getNewTimeStamp();
   const newtHash : string = Block.calculateblockHash(newIndex, previousBlock.hash, newTimestamp, data);

   const newBlock : Block = new Block(newIndex, newtHash, previousBlock.hash, data, newTimestamp);
   addBlock(newBlock);
   return newBlock;
} 

const getHashforBlock = (aBlock: Block) : string => Block.calculateblockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block) : boolean => {
   if(Block.validateStructure(candidateBlock)){
      return false;
   }else if(previousBlock.index + 1 !== candidateBlock.index){
      return false;
   }else if(previousBlock.hash !== candidateBlock.previousHash){
      return false;
   }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
      return false;
   } else{
      return true;
   }
};

const addBlock = (candidateBlock: Block) : void => {
   if(isBlockValid(candidateBlock, getLatestBlock())){
      blockchain.push(candidateBlock);
   }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
// console.log(createNewBlock("hello"), createNewBlock("bye bye"));

export {};