import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-menus',
  templateUrl: './index.main.html',
  styleUrls: ['./index.main.css']
})
export class IndexMainComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  @Output() private onDelete = new EventEmitter();

  ngOnInit(){
    console.log("index界面");
  }

  /*登出（注销）*/
  loginOut(){
    let condition = {};
    this.commonService.doHttpPost(urls.loginOutUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("注销成功");
          /*登出成功后，自动跳转到登陆界面*/
          this.router.navigate([routers.loginRouter]);
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

}
