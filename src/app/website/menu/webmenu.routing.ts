/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WebmenuMainComponent} from './main/webmenu.main.component';

const menuRoutes: Routes = [
  {
    path: '',
    component: WebmenuMainComponent,
    children: [
      {
        path: 'index',
        loadChildren: 'src/app/website/index/index.module#IndexModule',
      },
      {
        path: 'brand',
        loadChildren: 'src/app/website/brand/brand.module#BrandModule',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WebmenuRouting { }
