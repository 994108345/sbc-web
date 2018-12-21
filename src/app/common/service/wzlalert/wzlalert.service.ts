

import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/primeng';
import {MessageInfo, msgInfo} from './wzlalert.config';
import {AbstractComponent} from '../abstract.component';
@Injectable()
export class WzlAlertService {
  constructor(private messageService: MessageService ) {
  }
  msgs: Message[] = []; // 错误信息提示框+
  /*定时器*/
  timer:any;

  ngOnInit(){
  }
  /*显示成功信息*/
  success(messageInfo: string, typeMessage?: string) {
    if (!typeMessage) {
      typeMessage = 'Success';
    }
    /*清空提示信息数组*/
    this.clear();
    this.messageService.add ({severity: 'success', summary: typeMessage, detail: messageInfo});
    return this.msgs;
  }

  /*显示提示信息*/
  info(messageInfo: string, typeMessage?: string) {
    if (!typeMessage) {
      typeMessage = 'Info';
    }
    this.clear();
    this.messageService.add ({severity: 'info', summary: typeMessage, detail: messageInfo});
    return this.msgs;
  }

  /*显示警告信息*/
  warn(messageInfo: string, typeMessage?: string) {
    if (!typeMessage) {
      typeMessage = 'Warn';
    }
    this.clear();
    this.messageService.add ({severity: 'warn', summary: typeMessage, detail: messageInfo});
    return this.msgs;
  }

  /*显示错误信息*/
  error(messageInfo: string, typeMessage?: string) {
    if (!typeMessage) {
      typeMessage = 'Error';
    }
    this.clear();
    this.messageService.add ({severity:'error', summary: typeMessage, detail: messageInfo});
    return this.msgs;
  }

  /*显示多条信息*/
  multiple(message: any[]) {
    this.clear();
    for (let i = 0; i < message.length; i++) {
      const messagesInfo: MessageInfo = message[i];
      this.messageService.add (messagesInfo);
    }
    return this.msgs;
  }

  /*会往上次提示的信息里继续添加加信息*/
  showViaService() {
    this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
  }
/*清空提示信息*/
  clear() {
    this.messageService.clear();
  }

  /*设置定时器，定时清除提示信息*/
  clearByTimeOut(){
    console.log("定时器");
    //定时执行，5秒后执行
    this.timer = setInterval(()=>{
      /*定时器调用的方法*/
      this.clear();
    },1000 * 5)
 }

 /*清空数组*/
  clearMsgArr(msg:any[]){
    for (let i = 0; i < msg.length; i++) {
      msg.pop();
    }
  }
}

