/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeMainComponent} from './main/home.main.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '',component: HomeMainComponent,}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(indexRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRouting { }
