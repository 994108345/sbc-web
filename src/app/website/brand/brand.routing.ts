/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrandMainComponent} from './main/brand.main.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: BrandMainComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(brandRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BrandRouting { }
