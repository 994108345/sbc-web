import {Component, Injector, OnInit} from '@angular/core';
import {PermissionRoot, CommonRouters, successStatus} from '../../../service/base/common.config';
import {AbstractComponent} from '../../../service/abstract.component';

@Component({
  selector:'app-password-back',
  templateUrl: './reset.component.html',
  styleUrls: ['../../../../app.component.css','./reset.component.css']
})
export class ResetComponent extends AbstractComponent implements OnInit{
  /*弹出窗的布尔值*/
  isDialog:boolean = true;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("重置界面");
    /*请求后台路径*/
    this.commonUrls = {
      loginUrl:PermissionRoot + "/Login/login",
    };
    /*跳转菜单页面路径*/
    this.commonRouters = new CommonRouters("");
    this.commonRouters.menusRouter = 'menus';
  }

  /*登陆方法*/
  login(){
    let condition = null;
    this.commonService.doHttpPost(this.commonUrls.loginUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("登录成功");
          /*成功跳转菜单页面*/
          this.router.navigate([this.commonRouters.menusRouter]);
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }
}
