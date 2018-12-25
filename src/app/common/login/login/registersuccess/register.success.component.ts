import {Component, Injector, OnInit} from '@angular/core';
import {PermissionRoot, CommonRouters, successStatus} from '../../../service/base/common.config';
import {AbstractComponent} from '../../../service/abstract.component';
import {MessageService} from 'primeng/api';

@Component({
  selector:'app-register-success',
  templateUrl: './register.success.component.html',
  styleUrls: ['../../../../app.component.css','./register.success.component.css']
})
export class RegisterSuccessComponent extends AbstractComponent implements OnInit{

  countDownTime:number = 5;//登录倒计时
  timer:any;//定时器
  userInfo:any;//用户信息

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("注册成功界面");
    /*请求后台路径*/
    this.commonUrls = {
      loginUrl:PermissionRoot + "/Login/login",
    };
    /*跳转菜单页面路径*/
    this.commonRouters = new CommonRouters("");
    this.commonRouters.menusRouter = 'menus';

    /*从缓存取出用户信息*/
    this.userInfo = this.wzlCache.getCache("userInfo");

    /*倒计时方法*/
    this.countOutTimer();
  }

  countTime(){
    /*如果条件满足，清空定时器*/
    if(this.countDownTime == 0){
      clearInterval(this.timer);
      /*时间到了，调用登录接口*/
      this.login();
      return;
    }
    --this.countDownTime;
  }

  /*定时器*/
  countOutTimer(){
    //定时执行，5秒后执行
    this.timer = setInterval(()=>{
      /*定时器调用的方法*/
      this.countTime();
    },1000)
  }


  /*登陆方法*/
  login(){
    let condition = this.userInfo;
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
