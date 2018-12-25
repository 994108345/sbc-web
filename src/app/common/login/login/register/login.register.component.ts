import {Component, Injector, OnInit} from '@angular/core';
import {PermissionRoot, CommonRouters, successStatus} from '../../../service/base/common.config';
import {AbstractComponent} from '../../../service/abstract.component';
import {MessageService} from 'primeng/api';

@Component({
  selector:'app-register',
  templateUrl: './login.register.component.html',
  styleUrls: ['../../../../app.component.css','./login.register.component.css']
})
export class LoginRegisterComponent extends AbstractComponent implements OnInit{

  user:any = {};//一个用户名

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("登陆界面");
    /*请求后台路径*/
    this.commonUrls = {
      registerUrl:PermissionRoot + "/Register/register",
    };
    /*跳转菜单页面路径*/
    this.commonRouters = new CommonRouters("");
    this.commonRouters.menusRouter = 'menus';
    this.commonRouters.successRouter = 'login/success';
  }

  /*注册*/
  register(){
    if(this.paramValid()){
      this.commonService.doHttpPost(this.commonUrls.registerUrl,this.order).then(rst =>{
        if(rst){
          if(rst.status != successStatus){
            this.wzlAlert.error(rst.message);
          }else{
            this.wzlAlert.success("注册成功");
            /*注册成功时，将登陆的账号密码，存入缓存*/
            this.wzlCache.setCache("userInfo",this.order);
            /*成功跳转注册成功页面，然后调用login方法，然后自动登录*/
            this.router.navigate([this.commonRouters.successRouter]);
          }
        }else{
          this.wzlAlert.success("返回参数异常，请联系管理员");
        }
      })
    }
  }

  /**
   * 参数校验
   */
  paramValid(){
    if(!this.order.userName){
      this.wzlAlert.error("用户名不能为空");
      return false;
    }
    if(!this.order.passWord){
      this.wzlAlert.error("密码不能为空");
      return false;
    }
    if(!this.order.confirmPassWord){
      this.wzlAlert.error("确认密码不能为空");
      return false;
    }
    if(this.order.passWord != this.order.confirmPassWord){
      this.wzlAlert.error("密码和确认密码不同，请重新检查");
      return false;
    }
    if(!this.order.question1){
      this.wzlAlert.error("问题1不能为空");
      return false;
    }
    if(!this.order.answer1){
      this.wzlAlert.error("答案1不能为空");
      return false;
    }
    if(!this.order.question2){
      this.wzlAlert.error("问题2不能为空");
      return false;
    }
    if(!this.order.answer2){
      this.wzlAlert.error("答案2不能为空");
      return false;
    }
    return true;
  }
}
