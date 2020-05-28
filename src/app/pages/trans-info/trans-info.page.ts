import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { BlockchainService } from 'src/app/services/blockchain.service';
import { Tx } from 'src/app/models/tx.model';

@Component({
  selector: 'app-trans-info',
  templateUrl: './trans-info.page.html',
  styleUrls: ['./trans-info.page.scss'],
})
export class TransInfoPage implements OnInit {

  public tx: Tx;

  constructor(
    public blockchain: BlockchainService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.tx = JSON.parse(params.tx);
        console.log('Tx details', this.tx);
      }
    });
  }

  ionViewWillEnter() {
    this.blockchain.setTitleBarBackKeyShown(true);
  }

  ionViewDidEnter() {
    if(this.blockchain.loader) {
      this.blockchain.loadingCtrl.dismiss();
    }
  }

  getDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  fixNumber(number: number): string {
    return number.toLocaleString().split(/\s/).join(',');
  }

  goBack() {
    this.navCtrl.back();
  }
}
