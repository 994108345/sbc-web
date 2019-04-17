/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrandMainComponent} from './main/brand.main.component';
import {BrandAddComponent} from './add/brand.add.component';
import {BrandComponent} from './brand.component';
import {BrandEditComponent} from './edit/brand.edit.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: BrandComponent,
    children: [
      {path: 'add', component: BrandAddComponent},
      {path: 'info', component: BrandEditComponent},
      {path: 'view', component: BrandEditComponent},
      {path: '', component: BrandMainComponent},
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
