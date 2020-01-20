export class Block {
  constructor(
    public merkleroot: string,
    public nonce: number,
    public poolInfo: any,
    public previousblockhash: string,
    public hash: string,
    public tx: string[],
    public txlength: number,
    public _id: string,
    public confirmInfo: any,
    public difficulty: string,
    public version: number,
    public confirmations: number,
    public time: number,
    public date: any,
    public height: number,
    public bits: number,
    public size: number
  ) {}
}

export class FormattedBlock {
  constructor(
    public Pools: {},
    public Tx: string[],
    public Transactions: number,
    public Time: any,
    public Height: number,
    public Size: number
  ) {}
}
