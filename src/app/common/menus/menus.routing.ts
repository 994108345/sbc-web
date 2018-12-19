/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {MenusComponent} from './menus.component';
import {NgModule} from '@angular/core';

const menuRoutes: Routes = [
  {
    path: 'menus',
    component: MenusComponent,
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
