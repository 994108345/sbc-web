import {Component, Injector, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {ChatboardRoot} from '../../../common/service/base/common.config';
import {chatboardCols_config} from '../chatboard.main.config';

@Component({
  templateUrl: './chatboard.add.html',
  styleUrls: ['../../../app.component.css','./chatboard.add.css']
})
export class ChatboardAddComponent extends AbstractComponent{
  commentMessage:any = {};
  @ViewChild('table') table: any;
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.log("树洞界面");
    //跳转链接
    this.commonUrls = {
      addChatUrl :ChatboardRoot+ "/Comment/insertComment",
    };
  }

  /*跳转添加页面*/
  routerAddChat(){

  }

  /*保存记录*/
  saveComment(){
    /**todo   */
    this.commentMessage.userId = "wzl";
    this.commentMessage.userName="wzl";
    /**todo   */
    this.commonService.doHttpPost(this.commonUrls.addChatUrl,this.commentMessage).then(rtc =>{
      if(rtc){
      this.status = rtc.status;
      let message = rtc.message;
      if(this.status != 10000){
        this.wzlAlert.error(message);
      }else{
        this.wzlAlert.success("留言成功")
        this.router.navigate(["/menus/chatboard"]);
      }
      }else{
        this.wzlAlert.error("访问错误");
      }

    })
  }
}
