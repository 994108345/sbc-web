import {Component, Injector, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AbstractComponent} from '../../../../service/abstract.component';
import {CommonRouters, PermissionRoot, successStatus} from '../../../../service/base/common.config';

@Component({
  selector:'app-reset-username',
  templateUrl: './username.component.html',
  styleUrls: ['../../../../../app.component.css','./username.component.css']
})
export class UsernameComponent extends AbstractComponent implements OnInit{
  /*弹出窗的布尔值*/
  isDialog:boolean = true;
  /*问题1*/
  questionWeb1:any = {};
  /*问题2*/
  questionWeb2:any = {};

  /*后端的问题*/
  question1:any = {};

  /*后端的问题*/
  question2:any = {};

  /*弹窗用户名信息*/
  dialogObj:any ={};

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("确认用户名界面");
    /*请求后台路径*/
    this.commonUrls = {
      loginUrl:PermissionRoot + "/Login/login",
      validUserNameUrl:PermissionRoot + "/Reset/validUserName",
      queryQuestionsUrl:PermissionRoot + "/Reset/queryQuestions",
      validQuestionUrl:PermissionRoot + "/Reset/validQuestion",
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

  /*验证用户名*/
  validUserName(){
    if(!this.dialogObj.userName){
      this.wzlAlert.error("用户名不能为空");
      return;
    }
    this.commonService.doHttpPost(this.commonUrls.validUserNameUrl,this.dialogObj).then(rst =>{

      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          /*成功取消弹出窗*/
          this.isDialog = false;
          /*查询问题集合*/
          this.queryQuestions();
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

  /**
   * 查询问题集合
   */
  queryQuestions(){
    this.commonService.doHttpPost(this.commonUrls.queryQuestionsUrl,this.dialogObj).then(rst =>{
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          /*解析问题集合*/
          let questions = rst.data;
          this.question1 = questions[0];
          this.question2 = questions[1];
          this.questionWeb1.questionComment1 = this.question1.questionComment;
          this.questionWeb2.questionComment2 = this.question2.questionComment;
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

  /*验证问题是否符合*/
    validQuestions(){
    if(!this.questionWeb1.questionAnswer1){
      this.wzlAlert.error("答案1不能为空");
      return;
    }
    if(!this.questionWeb2.questionAnswer2){
      this.wzlAlert.error("答案2不能为空");
      return;
    }
    /*拼接参数*/
    let param = [];
    this.question1.questionAnswer = this.questionWeb1.questionAnswer1;
    this.question2.questionAnswer = this.questionWeb2.questionAnswer2;
    param.push(this.question1);
    param.push(this.question2);
    let condition = {"userQuestions":param};
    this.commonService.doHttpPost(this.commonUrls.validQuestionUrl,condition).then(rst =>{
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
         this.wzlAlert.success("成功后续")
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

}
