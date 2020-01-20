export class Tx {
  constructor(
    public valueOut: number,
    public isCoinBase: boolean,
    public vtype: number,
    public vout: any[],
    public blockhash: string,
    public time: number,
    public vin: any[],
    public txid: string,
    public blocktime: number,
    public version: number,
    public confirmations: number,
    public fees: number,
    public blockheight: number,
    public locktime: number,
    public _id: string,
    public size: number
  ) {}
}

export class Party {
  constructor(
    public outputpayload: string,
    public outputtype: number,
    public value: number,
    public n: number,
    public scriptPubKey: any,
  ) {}
}
