

import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/primeng';
import {AbstractComponent} from '../abstract.component';
import {NzNotificationService} from 'ng-zorro-antd';
@Injectable()
export class WzlngzorroantdmessageService {
  constructor(private nzNotificationService: NzNotificationService ) {
  }

  ngOnInit(){

  }

  /*ng-zorro-antd的消息提示框*/
  success(message: string): void {
    this.nzNotificationService.create(messageType.success, 'Success',
      message);
  }
  info(message: string): void {
    this.nzNotificationService.create(messageType.info, 'Info',
      message);
  }
  warning(message: string): void {
    this.nzNotificationService.create(messageType.warning, 'Warning',
      message);
  }
  error(message: string): void {
    this.nzNotificationService.create(messageType.error, 'Error',
      message);
  }

}

const messageType = {
  success:"success",info:"info",warning:"warning",error:"error"
};

