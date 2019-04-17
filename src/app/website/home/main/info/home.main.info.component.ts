import {AfterViewInit, Component, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {cacheKey, emitKey, routers, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {EmitService} from '../../../../common/service/emit/emit.service';
import {HomeIndexComponent} from '../../index/home.index.component';
import {HomeIndexMainComponent} from '../../index/main/home.index.main.component';
import {homeType} from '../home.config';

@Component({
  selector: 'web-home-info',
  templateUrl: './home.main.info.html',
  styleUrls: ['./home.main.info.css']
})
export class HomeMainInfoComponent extends AbstractComponent{

  //查询文章目录方法
  @Output() articleQuery: EventEmitter<any> = new EventEmitter();
  @Output() htmlChange = new EventEmitter<string>();

  array = [ "努力","继续", "坚持", "享受" ];
  articleAllInfos:any[] = [];
  //集合加载的遮罩框
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
  }
  //传递事件（查看文章具体内容）
  vote() {
    console.log("info开始跳转了")
    this.htmlChange.emit(homeType.homeArticle);
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
    //遮罩框
    this.isLoading = true;
    this.order.title = data;
    this.order.author = data;
    this.queryArticleAllInfos();
  }

  /*拼接文章展示数据*/
  joinShowData(data:any){
    //清空数据数组
    this.articleAllInfos.length = 0;
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
    //this.router.navigate([routers.homeArticleRouter])
    this.vote();
  }

  /**
   * 事件传递
   */
  queryTest(){
    console.log("我进来了")
  }
}
