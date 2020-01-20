import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.block = JSON.parse(params.block);
        console.log('Block details', this.block);
      }
    });
  }

  getDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

}
