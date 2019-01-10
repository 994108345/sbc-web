import {Component, Injector, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {ChatboardRoot} from '../../../common/service/base/common.config';
import {cacheKey} from '../../../app.config';

@Component({
  templateUrl: './redis.main.html',
  styleUrls: ['../../../app.component.css','./redis.main.css']
})
export class RedisMainComponent extends AbstractComponent{
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
    console.log("redis功能界面");
    //跳转链接
    this.commonUrls = {
      queryUrl :ChatboardRoot+ "/Comment/pageInfo",
      addChatUrl :ChatboardRoot+ "/Comment/insertComment",
    };
  }

  /*跳转添加页面*/
  routerAddChat(){
    this.router.navigate(["menus/chatboard/add"]);
  }
}
