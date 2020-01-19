import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Block, FormattedBlock } from '../models/blocks.model';
import { Rank } from '../models/ranks.model';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blocks: Block[] = [];
  public formattedBlocks: FormattedBlock[] = [];
  public ranks: Rank[] = [];
  public txs: string[] = [];

  constructor(private http: HttpClient) { }

  init() {
    setInterval(() => {
      // this.fetchHeight();
      this.fetchBlocks();
    }, 5000);

    this.fetchRanks();
  }

/*   fetchHeight() {
    console.log('Fetching Height..');
    this.http.get<any>('https://blockchain.elastos.org/api/v1/newblock').subscribe((res: any) => {
      console.log('Height', res);
    }, err => {
      console.log(err);
    })
  } */

  fetchRanks() {
    console.log('Fetching Ranks..');
    this.http.get<any>('https://blockchain.elastos.org/api/v1/addrs/richest-list').subscribe((res: any) => {
      console.log('Ranks fetched', res);
      this.ranks = res.info;
      console.log('Ranks concat', this.ranks);

    }, err => {
      console.log(err);
    });
  }

  fetchBlocks() {
    console.log('Fetching Blocks..');
    this.http.get<any>('https://blockchain.elastos.org/api/v1/blocks').subscribe((res: any) => {
      console.log('Blocks fetched', res);
      this.blocks = this.blocks.concat(res.blocks);
      this.blocks.forEach(block => {
        block.date = new Date(block.time * 1000).toLocaleTimeString();
      });
      this.orgBlocks(this.blocks);
      this.getTx();

    }, err => {
      console.log(err);
    });
  }

  orgBlocks(blocks: Block[]) {
    this.blocks = blocks.reduce((_blocks, current) => {
      const targetBlock = _blocks.find(block => block.merkleroot === current.merkleroot);
      if (!targetBlock) {
          return _blocks.concat([current]);
      } else {
          return _blocks;
      }
    }, []);
    console.log('Updated blocks', this.blocks);
  }

  getTx() {
    this.blocks.map(block => {
      block.tx.map(tx => {
        if(!this.txs.includes(tx)) {
          this.txs.push(tx);
        }
      })
    });
    console.log('Updated Transactions', + this.txs);
  }
}

// Transactions
// https://blockchain.elastos.org/api/v1/tx/3e179a902b315e059c9917474311c29d747ff1e0e0fbc37ce1e79ae0a564bc6c

// Blocks
// https://blockchain.elastos.org/api/v1/blocks/?limit=20


