import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { Block } from 'src/app/models/blocks.model';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.page.html',
  styleUrls: ['./block-info.page.scss'],
})
export class BlockInfoPage implements OnInit {

  public block: Block;

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
        this.block = JSON.parse(params.block);
        console.log('Block details', this.block);
      }
    });
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
