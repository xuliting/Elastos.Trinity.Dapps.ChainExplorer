export class Rank {
  constructor(
    public percentage: number,
    public balance: number,
    public address: string,
  ) {}
}

export class Address {
  constructor(
    public txApperances: number,
    public totalSent: number,
    public balanceSat: number,
    public unconfirmedTxApperances: number,
    public unconfirmedBalance: number,
    public totalReceivedSat: number,
    public totalReceived: number,
    public unconfirmedBalanceSat: number,
    public totalSentSat: number,
    public addrStr: string,
    public balance: number
  ) {}
}
