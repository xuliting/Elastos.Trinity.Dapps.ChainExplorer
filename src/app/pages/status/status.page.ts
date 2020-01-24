import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  public tableStyle: string = '';

  constructor(public blockchain: BlockchainService) { }

  ngOnInit() {
  }

  //// Toggling bootstrap and dark theme ////
  switchMode() {
    if(this.blockchain.tableStyle === 'bootstrap') {
      this.blockchain.tableStyle = 'dark';
      this.tableStyle = 'dark';
    } else {
      this.blockchain.tableStyle = 'bootstrap';
      this.tableStyle = 'bootstrap';
    }
  }

}
