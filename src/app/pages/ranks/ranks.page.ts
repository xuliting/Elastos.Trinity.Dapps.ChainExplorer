import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.page.html',
  styleUrls: ['./ranks.page.scss'],
})
export class RanksPage implements OnInit {

  public tableStyle: string = 'bootstrap';
  public lightMode: boolean = true;
  public address: string = "";

  constructor(
    public blockchain: BlockchainService,
    private router: Router,
  ) { }

  ngOnInit() {
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

  /*
  rankDetails(event) {
    console.log(event.row);
    let props: NavigationExtras = {
      queryParams: {
        rank: JSON.stringify(event.row)
      }
    }
    this.router.navigate(['/menu/rank/event.row.address'], props);
  }
  */

  // For fetching address details via api //
  rankDetails(event) {
    console.log(event.row);
    this.blockchain.addressDetails(event.row.address)
  }

  //// Toggling bootstrap and dark theme ////
  switchMode() {
    if(this.tableStyle === 'bootstrap') {
      this.tableStyle = 'dark';
    } else {
      this.tableStyle = 'bootstrap';
    }
  }

  getRowClass(row) {
    if(this.blockchain.ranks.indexOf(row) % 2 === 0) {
      return 'isEven';
    }
  }

}
