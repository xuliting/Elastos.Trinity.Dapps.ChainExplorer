import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Tx, Party } from 'src/app/models/tx.model';

@Component({
  selector: 'app-trans-info',
  templateUrl: './trans-info.page.html',
  styleUrls: ['./trans-info.page.scss'],
})
export class TransInfoPage implements OnInit {

  public tx: Tx;
  // public party1: Party
  // public party2: Party

  constructor(
    public blockchain: BlockchainService,
    private route: ActivatedRoute,
    private router: Router,
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
}
