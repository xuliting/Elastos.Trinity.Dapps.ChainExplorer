import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.page.html',
  styleUrls: ['./blocks.page.scss'],
})
export class BlocksPage implements OnInit {

  public tableStyle: string = 'bootstrap';
  public lightMode: boolean = true;

  constructor(
    public blockchain: BlockchainService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  blockDetails(event) {
    console.log(event.row);
    let props: NavigationExtras = {
      queryParams: {
        block: JSON.stringify(event.row)
      }
    }
    this.router.navigate(['/menu/block/event.row._id'], props);
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
    if(this.blockchain.blocks.indexOf(row) % 2 === 0) {
      return 'isEven';
    }
  }

  //// Customize row classes only using dark theme ////

  /* switchMode() {
    this.lightMode = !this.lightMode;
  }

  getRowClass(row) {
    if(this.lightMode === true) {
      if(this.blockchain.blocks.indexOf(row) % 2 === 0) {
        return 'isLightandOdd';
      } else {
        return 'isLightandEven'
      }
    } else {
      if(this.blockchain.blocks.indexOf(row) % 2 === 0) {
        return 'isDarkandOdd';
      } else {
        return 'isDarkandEven';
      }
    }
  } */
}
