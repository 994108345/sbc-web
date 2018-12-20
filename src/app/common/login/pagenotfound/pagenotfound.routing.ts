/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagenotfoundComponent} from './pagenotfound.component';

const pageNotFoundRoutes: Routes = [
  {
    path: 'pagenotfound',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(pageNotFoundRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagenotfoundRouterModule { }
