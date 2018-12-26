/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginMainComponent} from './main/login.main.component';
import {LoginRegisterComponent} from './register/login.register.component';
import {LoginComponent} from './login.component';
import {RegisterSuccessComponent} from './registersuccess/register.success.component';
import {ResetComponent} from './reset/reset.component';
import {UsernameComponent} from './reset/username/username.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children:[
      {path: '', component: LoginMainComponent},
      {path: 'register', component: LoginRegisterComponent},
      {path: 'success', component: RegisterSuccessComponent},
      {path: 'reset', component: ResetComponent},
      {path: 'username', component: UsernameComponent},
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
