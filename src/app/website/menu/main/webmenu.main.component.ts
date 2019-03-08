import {Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {BreadcrumbOption} from 'ng-zorro-antd';
import {Params} from '@angular/router';

@Component({
  selector: 'web-menus',
  templateUrl: './webmenu.main.html',
  styleUrls: ['./webmenu.main.css']
})
export class WebmenuMainComponent extends AbstractComponent{

  //菜单是否内嵌
  isCollapsed:false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("菜单界面");
    /*跳转index页面*/
    this.redictToIndex();
    /*从缓存中拿出用户信息*/
    this.userInfo = this.wzlCache.getCache(cacheKey.userInfo);
  }

  /*登出（注销）*/
  loginOut(){
    let condition = {};
    this.commonService.doHttpPost(urls.loginOutUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("注销成功");
          /*登出成功后，自动跳转到登陆界面*/
          this.router.navigate([routers.loginRouter]);
        }
      }else{
        this.wzlNgZorroAntdMessage.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
    })
  }

  /*内嵌菜单*/
  toggleCollapsed():void{
    // @ts-ignore
    this.isCollapsed  = !this.isCollapsed;
  }

  /*跳到index页面*/
  redictToIndex():void{
  this.router.navigate([routers.indexRouter]);
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
