import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController, Platform, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { Block, FormattedBlock } from '../models/blocks.model';
import { Rank, Address } from '../models/ranks.model';
import { Status } from '../models/status.model';
import { StorageService } from './storage.service';
import { Mainchain, Price, Voters, _Block } from '../models/stats.model';
import { Tx } from '../models/tx.model';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  // blockchain api
  public blocks: Block[] = [];
  public formattedBlocks: FormattedBlock[] = [];
  public ranks: Rank[] = [];
  public txs: string[] = [];
  public status: Status;
  public totalTx: number = null;

  // elanode api
  public statsFetched: boolean = false;
  public mainchain: Mainchain;
  public voters: Voters;
  public price: Price;
  public block: _Block;

  public tableStyle: string = 'bootstrap';
  public loader: any;
  public httpRequest: any;
  public api: string = 'https://blockchain.elastos.org/api/v1/';
  public proxyurl = "https://cors-anywhere.herokuapp.com/";

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private zone: NgZone,
    public storage: StorageService,
  ) { }

  init() {
    this.getMode();
    this.fetchStats();
    this.fetchBlocks();
    this.fetchStatus();
    this.fetchRanks();

    if (this.platform.platforms().indexOf("cordova") >= 0) {
      console.log("Listening to intent events");
      appManager.setListener((msg) => {
        this.onMessageReceived(msg);
      });
      titleBarManager.addOnItemClickedListener((menuIcon) => {
        if (menuIcon.key === "back") {
            this.navCtrl.back();
        }
      });
    }
  }

  onMessageReceived(ret: AppManagerPlugin.ReceivedMessage) {
    let params: any = ret.message;
    if (typeof (params) === 'string') {
        try {
            params = JSON.parse(params);
        } catch (e) {
            console.log('Params are not JSON format: ', params);
        }
    }

    if(params.action === 'preferenceChanged') {
      if (params.data.key === "ui.darkmode") {
        this.zone.run(() => {
            console.log(params.data.value);
       /*      if(params.data.value) {
              this.tableStyle = 'dark';
              titleBarManager.setBackgroundColor("#1b1e27");
              titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
            } else {
              this.tableStyle = 'bootstrap'
              titleBarManager.setBackgroundColor("#000000");
              titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
            } */
        });
      }
    }
  }

  setTitleBarBackKeyShown(show: boolean) {
    if (show) {
      titleBarManager.setIcon(TitleBarPlugin.TitleBarIconSlot.INNER_LEFT, {
        key: "back",
        iconPath: TitleBarPlugin.BuiltInIcon.BACK
      });
    }
    else {
      titleBarManager.setIcon(TitleBarPlugin.TitleBarIconSlot.INNER_LEFT, null);
    }
  }

  /******************************** Get Block/Tx/Rank/Status  ********************************/
  fetchStats() {
    this.http.get<any>(this.proxyurl + 'https://elanodes.com/api/widgets').subscribe((res) => {
      console.log(res);
      this.statsFetched = true;
      this.mainchain = res.mainchain;
      this.voters = res.voters;
      this.price = res.price;
      this.block = res.block;
    });
  }

  fetchRanks() {
    console.log('Fetching Ranks..');
    this.http.get<any>(this.api + 'addrs/richest-list').subscribe((res: any) => {
      console.log('Ranks fetched', res);
      this.ranks = res.info;
      console.log('Ranks concat', this.ranks);

    }, err => {
      console.log(err);
    });
  }

  fetchBlocks() {
    console.log('Fetching Blocks..');
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.api + 'blocks?limit=20').subscribe((res: any) => {
      console.log('Blocks fetched', res);
      this.totalTx = res.number_of_transactions;
      this.blocks = this.blocks.concat(res.blocks);
      this.blocks.forEach(block => {
        block.date = new Date(block.time * 1000).toLocaleTimeString();
      });
      this.orgBlocks(this.blocks);
      this.getTx();
      resolve();
    }, err => {
        console.log(err);
        resolve();
      });
    });
  }

  fetchStatus() {
    console.log('Fetching Status..');
    this.http.get<any>(this.api + 'status/?q=getInfo').subscribe((res: any) => {
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

    this.httpRequest = this.http.get<any>(this.api + 'block/' + block).subscribe((res: any) => {
      console.log('Block fetched', res);
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

  transDetails = (transaction: string) => {
    console.log('Fetching tx', transaction);
    this.loading('transaction', transaction);

    this.httpRequest = this.http.get<Tx>(this.api + 'tx/' + transaction).subscribe((res: Tx) => {
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

  /** Call address api w/o tx details **/
  addressDetails(address: string) {
    this.loading('address', address);
    console.log('Fetching address details', address);

    this.httpRequest = this.http.get<any>(this.api + 'addr/' + address + '/?noTxList=1').subscribe((res: Address) => {
      console.log('Address details fetched', res);
      this.loadingCtrl.dismiss();

      let props: NavigationExtras = {
        queryParams: {
          address: JSON.stringify(res),
        }
      }

      this.router.navigate(['/menu/rank/', address], props)
    }, err => {
      console.log(err.message);
      this.loadingCtrl.dismiss();
      this.loadingErr('address', address);
    });
  }

  /** Call both address apis before navigating to address-info pg **/

  /* async getAddressDetails(address: string) {
    this.loading('address', address);

    let addressInfo: Address = await this.addressDetails(address);
    let addressTxInfo: Tx[] = await this.addressTxDetails(address);

    let props: NavigationExtras = {
      queryParams: {
        addressInfo: JSON.stringify(addressInfo),
        addressTxInfo: JSON.stringify(addressTxInfo)
      }
    }

    this.loadingCtrl.dismiss().then(() => {
      this.router.navigate(['/menu/rank/', address], props)
    });
  }

  addressDetails(address: string): Promise<Address> {
    console.log('Fetching address details', address);

    return new Promise((resolve, reject) => {
      this.httpRequest = this.http.get<any>('https://blockchain.elastos.org/api/v1/addr/' + address + '/?noTxList=1').subscribe((res: Address) => {
        console.log('Address details fetched', res);
        resolve(res);
      }, err => {
        console.log(err.message);
        this.loadingCtrl.dismiss();
        this.loadingErr('address', address);
      });
    })
  }

  addressTxDetails(address: string): Promise<Tx[]> {
    console.log('Fetching address tx details', address);

    return new Promise((resolve, reject) => {
      this.httpRequest = this.http.get<any>('https://blockchain.elastos.org/api/v1/txs/?address=' + address + '&pageNum=0').subscribe((res: any) => {
        console.log('Address tx details fetched', res);
        resolve(res.txs);
      }, err => {
        console.log(err.message);
        this.loadingCtrl.dismiss();
        this.loadingErr('address', address);
      });
    })
  } */

  /******************************** Controllers ********************************/
  async loading(type: string, value: string,) {
    this.loader = await this.loadingCtrl.create({
      mode: "ios",
      spinner: 'bubbles',
      message: 'Loading ' + type.charAt(0).toUpperCase() + type.slice(1) + '...',
      translucent: true,
      backdropDismiss: true
    });

    this.loader.onDidDismiss().then(() => {
      console.log('Cancelling/Received Request', type + ':' + value);
      this.loader = null;
      this.httpRequest.unsubscribe();
    })

    return await this.loader.present();
  }

  async loadingErr(type: string, value: string) {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: type.charAt(0).toUpperCase() + type.slice(1) + ' Fetch Failed',
      message: 'Is this a correct ' + type + '?',
      buttons: ['OK']
    });
    await alert.present();
  }

  /******************************** Storage ********************************/
  saveMode(mode: string) {
    console.log('Saving mode', mode);
    this.storage.setMode(mode);
  }

  getMode() {
    this.storage.getMode().then((data: string) => {
      if(data) {
        this.tableStyle = data;
        console.log(data);
      }
    });
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
