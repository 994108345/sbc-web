import {Component, Injector, OnInit} from '@angular/core';
import {PermissionRoot, CommonRouters, successStatus} from '../../../service/base/common.config';
import {AbstractComponent} from '../../../service/abstract.component';
import {MessageService} from 'primeng/api';

@Component({
  selector:'app-login',
  templateUrl: './login.main.component.html',
  styleUrls: ['../../../../app.component.css','./login.main.component.css']
})
export class LoginMainComponent extends AbstractComponent implements OnInit{

  user:any = {};//一个用户名

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,private messageService: MessageService){
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

  /*消息关闭*/
  messageClose(){}

  /*测试消息提示*/
  register(){
    this.router.navigate([this.commonRouters.registerRouter]);
  }
}
