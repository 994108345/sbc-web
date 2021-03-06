import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {cacheKey, emitKey, routers, urls} from '../../../../app.config';
import {EmitService} from '../../../../common/service/emit/emit.service';

@Component({
  selector: 'web-home-index-main',
  templateUrl: './home.index.main.html',
  styleUrls: ['./home.index.main.css']
})
export class HomeIndexMainComponent extends AbstractComponent{

  //查询文章目录方法
  @Output() articleQuery: EventEmitter<any> = new EventEmitter();

  array = [ "努力","继续", "坚持", "享受" ];
  articleAllInfos:any[] = [];
  isLoading:boolean = true;


  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector,public emitService: EmitService){
    super(injector);
  }


  ngOnInit(){
    console.log("home界面");
    /*初始化列表*/
    this.queryArticleAllInfos();

    // 接收发射过来的数据
    this.emitService.eventEmit.subscribe((value: any) => {
      console.log(value);
      if(value[emitKey.emitkey] == emitKey.articleQuery) {
        console.log("收到了，我立马刷新列表");
      }
    });

    //初始化方法
    this.initializeFunc();

  }

  //初始化对外方法
  initializeFunc(){
    this.articleQuery.emit();
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
            this.isLoading = false;
          }
        }else{
          this.wzlNgZorroAntdMessage.success("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
    }
  }

  //外部调用查询
  queryArticleInfosToOut(data:any):void{
    this.order.title = data;
    this.order.author = data;
    this.queryArticleAllInfos();
  }

  /*拼接文章展示数据*/
  joinShowData(data:any){
    for (let value of data){
      let article = {href:"",title:"",avatar:"",description:"",content:"",clickCount:"",likeCount:"",commentCount:"",articleCode:""};
      article.href = "123123";
      article.title = value.title;
      article.avatar = "www.baidu.com";
      article.description = value.comment;
      article.content = value.shortComment;
      article.clickCount = value.clickCount;
      article.likeCount = value.likeCount;
      article.commentCount = value.commentCount;
      article.articleCode = value.articleCode;
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
    /*设置缓存*/
    this.wzlCache.setCache(cacheKey.articleCode,event.articleCode);
    /*跳到缓存页面*/
    this.router.navigate([routers.homeArticleRouter])
  }
}
