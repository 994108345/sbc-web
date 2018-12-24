import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {
  ButtonModule,
  FieldsetModule,
  InputTextModule,
  MessageModule,
  MessageService,
  MessagesModule,
  PasswordModule
} from 'primeng/primeng';
import {LoginRoutingModule} from './login.routing';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../../service/base/common.service';
import {WzlAlertService} from '../../service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../service/wzlcache/wzlceche.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {LoginMainComponent} from './main/login.main.component';
import {LoginRegisterComponent} from './register/login.register.component';
import {RegisterSuccessComponent} from './registersuccess/register.success.component';

@NgModule({
  imports: [
    /*普通输入框*/
    InputTextModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    ReactiveFormsModule,
    /*http请求模块*/
    HttpClientModule,
    /*密码输入框*/
    PasswordModule,
    /*按钮模块*/
    ButtonModule,
    /*消息提示模块*/
    ToastModule,
    /*标签页*/
    FieldsetModule,
    /*login路由模块：路由模块都放在最后*/
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    LoginMainComponent,
    LoginRegisterComponent,
    RegisterSuccessComponent,
  ],
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService],
})
export class LoginModule {

}
