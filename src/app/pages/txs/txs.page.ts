import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.page.html',
  styleUrls: ['./txs.page.scss'],
})
export class TxsPage implements OnInit {

  constructor(public blockchain: BlockchainService) { }

  ngOnInit() {
  }

}
