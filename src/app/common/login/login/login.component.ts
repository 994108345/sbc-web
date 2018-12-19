import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {BaseRoot, BizRoot, CommonRouters, successStatus} from '../../service/base/common.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['../../../app.component.css','./login.css']
})
export class LoginComponent extends AbstractComponent{

  user:any = {};//一个用户名

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("登陆界面");
    /*请求后台路径*/
    this.commonUrls = {
      loginUrl:BizRoot + "/Login/login",
    };
    /*跳转菜单页面路径*/
    this.commonRouters = new CommonRouters("");
    this.commonRouters.menusRouter = '/menus';
  }

  /*登陆方法*/
  login(){
    let condition = this.user;
    this.commonService.doHttpPost(this.commonUrls.loginUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.msgs = this.wzlAlert.error(rst.message);
        }else{
          this.msgs = this.wzlAlert.success("登陆成功");
          /*成功跳转菜单页面*/
          this.router.navigate([this.commonRouters.menusRouter]);
        }
      }else{
        this.msgs = this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.msgs = this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }
}
