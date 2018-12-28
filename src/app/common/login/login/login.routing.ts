/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginMainComponent} from './main/login.main.component';
import {LoginRegisterComponent} from './register/login.register.component';
import {LoginComponent} from './login.component';
import {RegisterSuccessComponent} from './registersuccess/register.success.component';
import {UsernameComponent} from './reset/username/username.component';
import {PasswordComponent} from './reset/password/password.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children:[
      {path: '', component: LoginMainComponent},
      {path: 'register', component: LoginRegisterComponent},
      {path: 'success', component: RegisterSuccessComponent},
      {path: 'username', component: UsernameComponent},
      {path: 'password', component: PasswordComponent},
    ]
  },
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
