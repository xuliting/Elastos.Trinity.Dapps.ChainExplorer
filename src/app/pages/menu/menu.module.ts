import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      // { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'blocks', loadChildren: '../blocks/blocks.module#BlocksPageModule' },
      { path: 'txs', loadChildren: '../txs/txs.module#TxsPageModule' },
      { path: 'ranks', loadChildren: '../ranks/ranks.module#RanksPageModule' },
      { path: 'status', loadChildren: '../status/status.module#StatusPageModule' },
      { path: 'block/:blockId', loadChildren: '../block-info/block-info.module#BlockInfoPageModule' },
      { path: 'rank/:rankId', loadChildren: '../rank-info/rank-info.module#RankInfoPageModule' },
      { path: 'trans/:transId', loadChildren: '../trans-info/trans-info.module#TransInfoPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
