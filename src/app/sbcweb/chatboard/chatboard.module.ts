import {MessageModule} from 'primeng/message';
import {ButtonModule, MessagesModule, PaginatorModule} from 'primeng/primeng';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ChatboardRouterModule} from './chatboard.router';
import {WzlAlertService} from '../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {ChatboardMainComponent} from './main/chatboard.main.component';
import {ChatboardComponent} from './chatboard.component';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatboardAddComponent} from './add/chatboard.add.component';
import {ToastModule} from 'primeng/toast';


@NgModule({
  imports: [
    /*用ng语法的模块*/
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    /*http请求模块*/
    HttpClientModule,
    /*消息提示模块*/
    MessagesModule,
    MessageModule,
    ToastModule,

    /*表模块*/
    TableModule,
    /*分页器*/
    PaginatorModule,
    /*按钮模块*/
    ButtonModule,
    /*-------------自己写的模块-----------------------------*/
    /*自己建的路由模块*/
    ChatboardRouterModule,
  ],
  providers: [WzlAlertService,WzlCacheService],
  declarations: [
    ChatboardComponent,ChatboardMainComponent,ChatboardAddComponent
  ],
  bootstrap: []
})
export class ChatboardModule {

}
