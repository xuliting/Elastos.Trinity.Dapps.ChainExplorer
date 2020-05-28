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
    this.tableStyle = this.blockchain.tableStyle;
  }

  ionViewWillEnter() {
    this.blockchain.setTitleBarBackKeyShown(false);
  }

  fixNumber(number: number): string {
    return number.toLocaleString().split(/\s/).join(',');
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
    this.blockchain.saveMode(this.tableStyle);
  }

}
