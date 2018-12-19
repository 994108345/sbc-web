/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagenotfoundComponent} from './pagenotfound.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagenotfoundRouting { }
