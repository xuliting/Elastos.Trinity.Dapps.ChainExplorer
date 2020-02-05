import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

declare let appManager: AppManagerPlugin.AppManager;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public blockchain: BlockchainService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    appManager.setVisible("show", ()=>{}, (err)=>{});
  }

  minimizeApp() {
    appManager.launcher();
  }

  closeApp() {
    appManager.close();
  }

}
