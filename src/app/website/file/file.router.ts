/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FileComponent} from './file.component';
import {FileMainComponent} from './main/file.main.component';
import {FileAddComponent} from './add/file.add.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: FileComponent,
    children: [
      {path:'add',component:FileAddComponent},
      {path: '', component: FileMainComponent},
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
export class FileRouter { }
