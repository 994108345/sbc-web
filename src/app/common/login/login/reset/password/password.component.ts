import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from '../../../../service/abstract.component';
import {successStatus} from '../../../../service/base/common.config';
import {routers, urls} from '../../../../../app.config';

@Component({
  selector:'app-reset-username',
  templateUrl: './password.component.html',
  styleUrls: ['../../../../../app.component.css','./password.component.css']
})
export class PasswordComponent extends AbstractComponent implements OnInit{
  /*用户名*/
  userName:string = "";
  /*定时器*/
  timer:any;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.log("输入新密码界面");
    /*从缓存获取用户名*/
    this.userName = this.wzlCache.getCache("userName");
  }
  /*修改密码方法*/
  modifyPassWord(){
    if(this.order.passWord != this.order.passWordAgain){
      this.wzlAlert.error("两次输入的密码不相同，请重新输入");
      return;
    }
    /*赋值：用户名*/
    this.order.userName = this.userName;
    let condition = this.order;
    this.commonService.doHttpPost(urls.modifyPasswordUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("修改成功，3秒后自动跳转登陆界面");

          /*成功跳转菜单页面*/
          this.timerLogin();
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

  /*设置定时器*/
  timerLogin(){
    this.timer = setInterval(()=>{
      /*跳登陆界面*/
      this.routerLogin();
    },1000 * 3)
  }

  /*跳转登陆界面*/
  routerLogin(){
    this.router.navigate([routers.loginRouter]);
    /*删除定时器*/
    clearInterval(this.timer);
  }







}


