import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

declare let appManager: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public blockchain: BlockchainService) { }

  ngOnInit() {
  }

  minimizeApp() {
    appManager.launcher();
  }

  closeApp() {
    appManager.close();
  }

}
