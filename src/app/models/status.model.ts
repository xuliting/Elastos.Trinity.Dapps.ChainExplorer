export class Status {
  constructor(
    public errors: string,
    public blocks: number,
    public network: string,
    public connections: number,
    public difficulty: number,
    public testnet: boolean,
    public version: number,
    public relayfee: number,
    public protocolversion: number,
    public timeoffset: number,
    public proxy: string
  ) {}
}
