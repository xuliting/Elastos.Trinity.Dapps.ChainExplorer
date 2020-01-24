import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.page.html',
  styleUrls: ['./blocks.page.scss'],
})
export class BlocksPage implements OnInit {

  public tableStyle: string = '';
  public block: string = "";

  constructor(
    public blockchain: BlockchainService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tableStyle = this.blockchain.tableStyle;
  }

  searchBlock() {
    if(!this.block) {
      console.log('Input empty');
      return;
    } else {
      console.log(this.block);
      this.blockchain.blockDetails(this.block);
    }
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
    if(this.blockchain.tableStyle === 'bootstrap') {
      this.blockchain.tableStyle = 'dark';
      this.tableStyle = 'dark';
    } else {
      this.blockchain.tableStyle = 'bootstrap';
      this.tableStyle = 'bootstrap';
    }
  }

  getRowClass(row) {
    if(this.tableStyle === 'dark' && this.blockchain.blocks.indexOf(row) % 2 === 0) {
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
