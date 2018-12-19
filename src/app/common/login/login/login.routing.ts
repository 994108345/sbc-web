/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {NgModule} from '@angular/core';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
