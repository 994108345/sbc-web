import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MenusComponent} from './menus.component';
import {
  ButtonModule,
  InputTextModule,
  MenuModule,
  MessageModule,
  MessageService,
  MessagesModule,
  PanelMenuModule,
  PasswordModule
} from 'primeng/primeng';
import {MenusRouterModule} from './menus.routing';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {CommonService} from '../service/base/common.service';
import {WzlCacheService} from '../service/wzlcache/wzlceche.service';
import {WzlAlertService} from '../service/wzlalert/wzlalert.service';

@NgModule({
  declarations: [
    MenusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MessagesModule,
    MessageModule,
    ToastModule,
    /*菜单列表模块*/
    MenuModule,
    PanelMenuModule,
    /*login路由模块：路由模块都放在最后*/
    MenusRouterModule
  ],
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService],
})
export class MenusModule {

}
