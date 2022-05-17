import crypto from "crypto";
// 현재 문제가 없으나, ts에서 crypto타입을 모른다는 오류가 났을떄 해결 방법
// 1. .d.ts 파일 작성 => 비효율적
// 2. definitelyTyped 레포로 가서 해당 파일 확인 후, npm i 한다 (npm i -D @types/node);

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    //   왜 얕은 복사를 해서 return 하는가
    // getBlocks 함수를 실행시켜서 배열을 들고오면 배열의 API가 모두 가능하다, 즉 해킹 가능
    // 그걸 방지하기 위해 본 데이터를 보호하려고 얕은 복사함
    return [...this.blocks];
  }
}

const blockchain = new BlockChain();
blockchain.addBlock("First one");
blockchain.addBlock("seconde one");
blockchain.addBlock("third one");

console.log(blockchain.getBlocks());
