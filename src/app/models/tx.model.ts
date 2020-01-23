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
