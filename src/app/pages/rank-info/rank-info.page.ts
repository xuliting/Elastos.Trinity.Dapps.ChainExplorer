import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Rank, Address } from 'src/app/models/ranks.model';

@Component({
  selector: 'app-rank-info',
  templateUrl: './rank-info.page.html',
  styleUrls: ['./rank-info.page.scss'],
})
export class RankInfoPage implements OnInit {

  public rank: Rank;
  public address: Address;
  public txs: any;

  constructor(
    public blockchain: BlockchainService,
    private route: ActivatedRoute,
    private router: Router,
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
  }

  // For fetching rank details via api //
  /* ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.address = JSON.parse(params.address);
        console.log('Rank details', this.address);
      }
    });
  } */

}
