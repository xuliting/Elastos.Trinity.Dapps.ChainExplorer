import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Block } from 'src/app/models/blocks.model';
import { BlockchainService } from 'src/app/services/blockchain.service';


@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.page.html',
  styleUrls: ['./block-info.page.scss'],
})
export class BlockInfoPage implements OnInit {

  public block: Block;

  constructor(
    public blockchain: BlockchainService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.block = JSON.parse(params.block);
        console.log('Block details', this.block);
      }
    });
  }

  ionViewWillEnter() {
    this.blockchain.setTitleBarBackKeyShown(true);
  }

  ionViewDidEnter() {
    if(this.blockchain.loader) {
      this.blockchain.loadingCtrl.dismiss();
    }
  }

  getDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  fixNumber(number: number): string {
    return number.toLocaleString().split(/\s/).join(',');
  }

  goBack() {
    this.navCtrl.back();
  }

  /*** Fetch tx details ***/
  txDetails(transaction: string) {
    console.log('Fetching tx', transaction);
    this.blockchain.loading('transaction', transaction);

    this.blockchain.httpRequest = this.http.get<any>(this.blockchain.api + 'tx/' + transaction).subscribe((res: any) => {
      console.log('Tx fetched', res);
      this.loadingCtrl.dismiss();

      let props: NavigationExtras = {
        queryParams: {
          tx: JSON.stringify(res)
        }
      }
      this.router.navigate(['/menu/trans/', transaction], props);

    }, err => {
      console.log(err.message);
      this.loadingCtrl.dismiss();
      this.blockchain.loadingErr('transaction', transaction);
    });
  }
}
