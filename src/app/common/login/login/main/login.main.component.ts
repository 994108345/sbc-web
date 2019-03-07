import {Component, Injector, OnInit} from '@angular/core';
import {PermissionRoot, CommonRouters, successStatus} from '../../../service/base/common.config';
import {AbstractComponent} from '../../../service/abstract.component';
import {MessageService} from 'primeng/api';
import {cacheKey, routers, urls} from '../../../../app.config';

@Component({
  selector:'app-login',
  templateUrl: './login.main.component.html',
  styleUrls: ['../../../../app.component.css','./login.main.component.css']
})
export class LoginMainComponent extends AbstractComponent implements OnInit{
  loginType:any = 1;//登陆类型 0是老的登陆，1是新的登陆
  user:any = {};//一个用户名

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("登陆界面");
    /*请求后台路径*/
    this.commonUrls = {
      loginUrl:PermissionRoot + "/Login/login",
    };
    /*跳转菜单页面路径*/
    this.commonRouters = new CommonRouters("");
    this.commonRouters.menusRouter = 'menus';
    this.commonRouters.registerRouter = 'login/register';
    this.commonRouters.resetRouter = 'login/username';
  }

  /*登陆方法*/
  login(){
    let condition = this.user;
    this.commonService.doHttpPost(this.commonUrls.loginUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("登录成功");
          /*登陆成功时，将登陆的账号密码，存入缓存*/
          this.wzlCache.setCache(cacheKey.userInfo,rst.data);
          /*访问数+1*/
          this.addAccessCount();
          /*成功跳转菜单页面*/
          if(this.loginType == 0){
            this.router.navigate([this.commonRouters.menusRouter]);
          }else{
            this.router.navigate([routers.indexRouter]);
          }
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

  /*访问数+1*/
  addAccessCount(){
    let condition = {userInfo:this.user};
    this.commonService.doHttpPost(urls.accessCountUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

  /*测试消息提示*/
  register(){
    this.router.navigate([this.commonRouters.registerRouter]);
  }

  /*找回密码*/
  reset(){
    this.router.navigate([this.commonRouters.resetRouter]);
  }
}
