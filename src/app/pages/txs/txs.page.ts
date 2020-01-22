import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.page.html',
  styleUrls: ['./txs.page.scss'],
})
export class TxsPage implements OnInit {

  public tx: string = "";

  constructor(public blockchain: BlockchainService) { }

  ngOnInit() {
  }

  searchTx() {
    if(!this.tx) {
      console.log('Input empty');
      return;
    } else {
      console.log(this.tx);
      this.blockchain.transDetails(this.tx);
    }
  }

}
