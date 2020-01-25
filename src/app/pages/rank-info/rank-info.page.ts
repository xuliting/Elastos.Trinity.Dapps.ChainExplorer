import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { BlockchainService } from 'src/app/services/blockchain.service';
import { Rank, Address } from 'src/app/models/ranks.model';
import { Tx } from 'src/app/models/tx.model';

@Component({
  selector: 'app-rank-info',
  templateUrl: './rank-info.page.html',
  styleUrls: ['./rank-info.page.scss'],
})
export class RankInfoPage implements OnInit {

  public rank: Rank;
  public address: Address;
  public txs: Tx[] = [];
  private txPg: number = 0;
  public fetchingTx: boolean = false;

  constructor(
    public blockchain: BlockchainService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.rank) {
        this.rank = JSON.parse(params.rank);
        console.log('Rank details', this.rank);
      }
      if (params && params.address) {
        this.address = JSON.parse(params.address);
        console.log('Address details', this.address);
      }
      if (params && params.addressInfo && params.addressTxInfo) {
        this.address = JSON.parse(params.addressInfo);
        this.txs = JSON.parse(params.addressTxInfo);
        console.log('Address details', this.address);
        console.log('Address tx details', this.txs);
      }
    });

    this.findRank();
  }

  ionViewDidEnter() {
    if(this.blockchain.loader) {
      this.blockchain.loadingCtrl.dismiss();
    }

    this.fetchingTx = true;
    this.http.get<any>('https://blockchain.elastos.org/api/v1/txs/?address=' + this.address.addrStr + '&pageNum=0').subscribe((res: any) => {
      console.log('Address tx details fetched', res);
      this.fetchingTx = false;
      this.txs = res.txs;
    }, err => {
      this.fetchingTx = false;
      console.log(err.message);
    });
  }

  findRank() {
    this.rank = this.blockchain.ranks.find(rank => rank.address === this.address.addrStr);
  }

  getDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  fixNumber(number: number): string {
    return number.toLocaleString().split(/\s/).join(',');
  }

  fixPercent(percent: number): string {
    return percent.toFixed(2);
  }

  getTxs(address: string) {
    this.txPg++;
    this.fetchingTx = true;
    console.log('Fetching tx pg', this.txPg);

    this.http.get<any>('https://blockchain.elastos.org/api/v1/txs/?address=' + address + '&pageNum=' + this.txPg).subscribe((res: any) => {
      console.log('Address tx details fetched', res);
      this.fetchingTx = false;
      this.txs = this.txs.concat(res.txs);
    }, err => {
      this.txPg--;
      this.fetchingTx = false;
      console.log(err.message);
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
