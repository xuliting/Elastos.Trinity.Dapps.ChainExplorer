import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.tx = JSON.parse(params.tx);
        console.log('Tx details', this.tx);
      }
    });
  }

  getDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleTimeString();
  }

  goBack() {
    this.navCtrl.back();
  }
}
