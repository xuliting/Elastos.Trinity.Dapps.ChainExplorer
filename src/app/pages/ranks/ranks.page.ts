import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.page.html',
  styleUrls: ['./ranks.page.scss'],
})
export class RanksPage implements OnInit {

  public tableStyle: string = '';
  public address: string = "";

  constructor(
    public blockchain: BlockchainService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tableStyle = this.blockchain.tableStyle;
  }

  searchAddress() {
    if(!this.address) {
      console.log('Input empty');
      return;
    } else {
      console.log(this.address);
      this.blockchain.addressDetails(this.address);
    }
  }

  //// For fetching address details via api ////
  rankDetails(event) {
    console.log(event.row);
    this.blockchain.addressDetails(event.row.address)
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

  getRowClass(row) {
    if(this.tableStyle === 'dark' && this.blockchain.ranks.indexOf(row) % 2 === 0) {
      return 'isEven';
    }
  }

}
