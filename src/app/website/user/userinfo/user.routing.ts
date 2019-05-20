/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserMainComponent} from './main/user.main.component';

const userRouters: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '',component: UserMainComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRouters)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRouting { }
