/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoMainComponent} from './main/demo.main.component';
import {DemoAddComponent} from './add/demo.add.component';
import {DemoComponent} from './demo.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {path: 'add', component: DemoAddComponent},
      {path: '', component: DemoMainComponent},
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
export class DemoRouting { }
