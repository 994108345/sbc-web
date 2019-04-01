import {Component, Injector} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {ArticleAllInfo} from "../home.config";

@Component({
  selector: 'web-home',
  templateUrl: './home.main.html',
  styleUrls: ['./home.main.css']
})
export class HomeMainComponent extends AbstractComponent{

  array = [ "努力","继续", "坚持", "享受" ];
  articleAllInfos:any[] = [];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("home界面");

  }
  /*每当 Angular 初始化完组件视图及其子视图之后调用。*/
  ngAfterViewInit(){
    this.queryArticleAllInfos();
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

  /*查询文章信息列表*/
  queryArticleAllInfos(){
    if(urls.queryArticleAllInfosUrl){
      let condition = this.ngZorroSearParam();
      this.commonService.doHttpPost(urls.queryArticleAllInfosUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.totalRecords = rst.totalRecords;
            /*拼展示数据*/
            this.joinShowData(rst.data);
          }
        }else{
          this.wzlNgZorroAntdMessage.success("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
    }
  }

  /*拼接文章展示数据*/
  joinShowData(data:any){
    for (let value of data){
      let article = {href:"",title:"",avatar:"",description:"",content:"",clickCount:"",likeCount:"",commentCount:""};
      article.href = "123123";
      article.title = value.title;
      article.avatar = "www.baidu.com";
      article.description = value.comment;
      article.content = value.shortComment + "213456";
      article.clickCount = value.clickCount;
      article.likeCount = value.likeCount;
      article.commentCount = value.commentCount;
      this.articleAllInfos.push(article);
    }
  }

  /*文章翻页*/
  loadArticleAllInfos(event){
    if(event){
      this.nzPageIndex = event;
      this.queryArticleAllInfos();
    }
  }

  /*文章点击事件*/
  articleClick(event){
    console.log(this.toJsonStr(event));
  }
}
