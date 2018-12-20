import {Component, Injector, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {ChatboardRoot} from '../../../common/service/base/common.config';
import {chatboardCols_config} from './chatboard.main.config';

@Component({
  templateUrl: './chatboard.main.html',
  styleUrls: ['../../../app.component.css','./chatboard.main.css']
})
export class ChatboardMainComponent extends AbstractComponent{
  /**
   * 列名
   */
  chatboardCols:any[];


  @ViewChild('table') table: any;
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.log("树洞界面");
    //跳转链接
    this.commonUrls = {
      queryUrl :ChatboardRoot+ "/Comment/pageInfo",
      addChatUrl :ChatboardRoot+ "/Comment/insertComment",
    };
    /*列名*/
    this.chatboardCols = chatboardCols_config;
  }

  /*跳转添加页面*/
  routerAddChat(){

  }
}
