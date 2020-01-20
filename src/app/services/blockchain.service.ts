import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';

import { Block, FormattedBlock } from '../models/blocks.model';
import { Rank } from '../models/ranks.model';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blocks: Block[] = [];
  public formattedBlocks: FormattedBlock[] = [];
  public ranks: Rank[] = [];
  public txs: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

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
    this.http.get<any>('https://blockchain.elastos.org/api/v1/blocks?limit=20').subscribe((res: any) => {
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

  transDetails(transaction: string) {
    console.log('Fetching tx', transaction);
    this.loading(transaction);

    this.http.get<any>('https://blockchain.elastos.org/api/v1/tx/' + transaction).subscribe((res: any) => {
      console.log('Tx fetched', res);
      this.loadingCtrl.dismiss();

      let props: NavigationExtras = {
        queryParams: {
          tx: JSON.stringify(res)
        }
      }
      this.router.navigate(['/menu/trans/transaction'], props);

    }, err => {
      console.log(err.message);
      this.loadingCtrl.dismiss();
      this.transErr();
    });
  }

  //// Controllers ////
  async loading(tx: string) {
    const loading = await this.loadingCtrl.create({
      mode: "ios",
      spinner: 'bubbles',
      duration: 5000,
      message: 'Loading Transaction...',
      translucent: true,
    });
    return await loading.present();
  }

  async transErr() {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Transaction Fetch Failed',
      message: 'There was en error fetching transaction',
      buttons: ['OK']
    });
    await alert.present();
  }
}

// Transactions
// https://blockchain.elastos.org/api/v1/tx/3e179a902b315e059c9917474311c29d747ff1e0e0fbc37ce1e79ae0a564bc6c

// Blocks
// https://blockchain.elastos.org/api/v1/blocks/?limit=20


