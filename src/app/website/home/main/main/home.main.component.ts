import {Component, Injector} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {cacheKey, routers, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {ArticleAllInfo} from "../home.config";

@Component({
  selector: 'web-home',
  templateUrl: './home.main.html',
  styleUrls: ['./home.main.css']
})
export class HomeMainComponent extends AbstractComponent{
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("home界面");
    this.router.navigate([routers.homeIndexRouter]);
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

  /*Z登陆*/
  login(){
    if(routers.loginRouter){
      this.router.navigate([routers.loginRouter]);
    }else{
      this.wzlNgZorroAntdMessage.error("登陆路由不存在，请联系管理员");
    }
  }
}
