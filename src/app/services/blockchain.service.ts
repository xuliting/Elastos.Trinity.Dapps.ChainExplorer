import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { Block, FormattedBlock } from '../models/blocks.model';
import { Rank, Address } from '../models/ranks.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blocks: Block[] = [];
  public formattedBlocks: FormattedBlock[] = [];
  public ranks: Rank[] = [];
  public txs: string[] = [];
  public status: Status;

  constructor(
    private http: HttpClient,
    private router: Router,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  init() {
    setInterval(() => {
      this.fetchBlocks();
    }, 5000);

    this.fetchStatus();
    this.fetchRanks();
  }

  /******************************** Get Block/Tx/Rank/Status  ********************************/
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

  fetchStatus() {
    console.log('Fetching Status..');
    this.http.get<any>('https://blockchain.elastos.org/api/v1/status/?q=getInfo').subscribe((res: any) => {
      console.log('Chain status fetched', res);
      this.status = res.info;
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

  /******************************** Get Block/Tx/Address Details ********************************/
  blockDetails(block: string) {
    console.log('Fetching block', block);
    this.loading('block', block);

    this.http.get<any>('https://blockchain.elastos.org/api/v1/block/' + block).subscribe((res: any) => {
      console.log('Tx fetched', res);
      this.loadingCtrl.dismiss();

      let props: NavigationExtras = {
        queryParams: {
          block: JSON.stringify(res)
        }
      }
      this.router.navigate(['/menu/block/', block], props);

    }, err => {
      console.log(err.message);
      this.loadingCtrl.dismiss();
      this.loadingErr('block', block);
    });
  }

  transDetails(transaction: string) {
    console.log('Fetching tx', transaction);
    this.loading('transaction', transaction);

    this.http.get<any>('https://blockchain.elastos.org/api/v1/tx/' + transaction).subscribe((res: any) => {
      console.log('Tx fetched', res);
      this.loadingCtrl.dismiss();

      let props: NavigationExtras = {
        queryParams: {
          tx: JSON.stringify(res)
        }
      }
      this.router.navigate(['/menu/trans/', transaction], props);

    }, err => {
      console.log(err.message);
      this.loadingCtrl.dismiss();
      this.loadingErr('transaction', transaction);
    });
  }

  addressDetails(address: string) {
    console.log('Fetching address', address);
    this.loading('address', address);

    this.http.get<any>('https://blockchain.elastos.org/api/v1/addr/' + address + '/?noTxList=1').subscribe((res: any) => {
      console.log('Address fetched', res);
      this.loadingCtrl.dismiss();

      let props: NavigationExtras = {
        queryParams: {
          address: JSON.stringify(res)
        }
      }
      this.router.navigate(['/menu/rank/', address], props);

    }, err => {
      console.log(err.message);
      this.loadingCtrl.dismiss();
      this.loadingErr('address', address);
    });
  }

  /** TO DO **/
  /* async getAddressDetails(address: string) {
    this.loading('address', address);
    let addressInfo = await this.addressDetails(address);
    let addressTxInfo = await this.addressTxDetails(address);

    let props: NavigationExtras = {
      queryParams: {
        addressInfo: JSON.stringify(addressInfo),
        addressTxInfo: JSON.stringify(addressTxInfo)
      }
    }
    this.router.navigate(['/menu/rank/', address], props);
    this.loadingCtrl.dismiss();
  }

  addressDetails(address: string): Promise<Address> {
    console.log('Fetching address details', address);
    return new Promise((resolve, reject) => {
      this.http.get<any>('https://blockchain.elastos.org/api/v1/addr/' + address + '/?noTxList=1').subscribe((res: Address) => {
        console.log('Address details fetched', res);
        resolve(res);
      }, err => {
        console.log(err.message);
        this.loadingCtrl.dismiss();
        this.loadingErr('address', address);
      });
    })
  }

  addressTxDetails(address: string): Promise<any> {
    console.log('Fetching address tx details', address);

    return new Promise((resolve, reject) => {
      this.http.get<any>('https://blockchain.elastos.org/api/v1/txs/?address=' + address + '&pageNum=0').subscribe((res: any) => {
        console.log('Address tx details fetched', res);
        resolve(res.info);
      }, err => {
        console.log(err.message);
        this.loadingCtrl.dismiss();
        this.loadingErr('address', address);
      });
    })
  } */

  /******************************** Controllers ********************************/
  async loading(type: string, value: string,) {
    const loading = await this.loadingCtrl.create({
      mode: "ios",
      spinner: 'bubbles',
      message: 'Loading ' + type.charAt(0).toUpperCase() + type.slice(1) + '...',
      translucent: true,
    });
    return await loading.present();
  }

  async loadingErr(type: string, value: string) {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: type.charAt(0).toUpperCase() + type.slice(1) + ' Fetch Failed',
      message: 'There was en error fetching ' + type,
      buttons: ['OK']
    });
    await alert.present();
  }
}


// Blocks Ex:
// https://blockchain.elastos.org/api/v1/blocks/?limit=20

// Transaction Details Ex:
// https://blockchain.elastos.org/api/v1/tx/3e179a902b315e059c9917474311c29d747ff1e0e0fbc37ce1e79ae0a564bc6c

// Block Details Ex:
// https://blockchain.elastos.org/api/v1/block/136914236db07a6b21a99b207f8d1e45568de5a4d83823680eb2836f27069627/

// Address Tx Details Ex:
// https://blockchain.elastos.org/api/v1/txs/?address=Ed57c3wF3J1u8vEYE9cjGUpqGPkEJC69v8&pageNum=0
