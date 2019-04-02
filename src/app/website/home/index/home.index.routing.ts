/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeIndexComponent} from './home.index.component';
import {HomeIndexMainComponent} from './main/home.index.main.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeIndexComponent,
    children: [
      {path: '',component: HomeIndexMainComponent,},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeIndexRouting { }
