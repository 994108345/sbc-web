import {NgModule} from '@angular/core';
import {ChatboardModule} from './chatboard/chatboard.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule, MessagesModule, PaginatorModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
  ],
  imports: [
    /*表模块*/
    TableModule,
    /*分页器*/
    PaginatorModule,
    /*按钮模块*/
    ButtonModule,
    /*消息提示模块*/
    MessagesModule,
    MessageModule,
    ToastModule,
    /*------------------自己写的留言板模块--------------------*/
    ChatboardModule,
  ],
  providers: [],
  bootstrap: []
})
export class SbcwebModule {}
