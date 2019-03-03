/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StudynoteComponent} from './studynote.component';
import {StudynoteMainComponent} from './main/studynote.main.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: StudynoteComponent,
    children: [
      {path: '', component: StudynoteMainComponent},
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
export class StudynoteRouter { }
