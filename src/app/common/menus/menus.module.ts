import {NgModule} from '@angular/core';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {CommonService} from '../service/base/common.service';
import {WzlCacheService} from '../service/wzlcache/wzlceche.service';
import {WzlAlertService} from '../service/wzlalert/wzlalert.service';
import {MenusMainComponent} from './main/menus.main.component';
import {IndexComponent} from './index/index.component';

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
    MessagesModule,
    MessageModule,
    ToastModule,
    /*菜单列表模块*/
    MenuModule,
    PanelMenuModule,
    /*login路由模块：路由模块都放在最后*/
    MenusRouterModule,
  ],
  declarations: [
    MenusComponent,
    MenusMainComponent,
    IndexComponent,
  ],
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService],
})
export class MenusModule {

}
