import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Rank } from 'src/app/models/ranks.model';

@Component({
  selector: 'app-rank-info',
  templateUrl: './rank-info.page.html',
  styleUrls: ['./rank-info.page.scss'],
})
export class RankInfoPage implements OnInit {

  public rank: Rank;

  constructor(
    public blockchain: BlockchainService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.rank = JSON.parse(params.rank);
        console.log('Rank details', this.rank);
      }
    });
  }

}
