import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.page.html',
  styleUrls: ['./ranks.page.scss'],
})
export class RanksPage implements OnInit {

  constructor(public blockchain: BlockchainService) { }

  ngOnInit() {
  }

}
