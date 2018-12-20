/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenusMainComponent} from './main/menus.main.component';
import {IndexComponent} from './index/index.component';

const menuRoutes: Routes = [
  {
    path: '',
    component: MenusMainComponent,
    children: [
      {path: 'chatboard', loadChildren: 'src/app/sbcweb/chatboard/chatboard.module#ChatboardModule'},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenusRouterModule { }
