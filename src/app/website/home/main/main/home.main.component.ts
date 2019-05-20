import {AfterViewInit, Component, Injector, Input, ViewChild} from '@angular/core';
import {asllCode, cacheKey, emitKey, routers, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {EmitService} from '../../../../common/service/emit/emit.service';
import {HomeIndexMainComponent} from '../../index/main/home.index.main.component';
import {homeType} from '../home.config';

@Component({
  selector: 'web-home',
  templateUrl: './home.main.html',
  styleUrls: ['./home.main.css']
})
export class HomeMainComponent extends AbstractComponent implements AfterViewInit{

  @ViewChild('homeInfo')
  private homeInfo: HomeIndexMainComponent;

  searchParam: string = null;

  //是否文章列表主页
  isHomeInfo: boolean = true;
  //是否文章明细页
  isHomeArticlea: boolean = false;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector: Injector, public emitService: EmitService) {
    super(injector);
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    console.log('home界面');
    //this.router.navigate([routers.homeIndexRouter]);
  }

  //选择显示那几个子组件
  viewChange(type:String){
    if(type == homeType.homeIndex){
      this.isHomeInfo = true;
      this.isHomeArticlea = false;
    }
    if(type == homeType.homeArticle){
      this.isHomeInfo = false;
      this.isHomeArticlea = true;
    }
  }

  /**
   * 回主页
   */
  goHome(){
    this.viewChange(homeType.homeIndex);
  }


  /*登出（注销）*/
  loginOut() {
    const condition = {};
    this.commonService.doHttpPost(urls.loginOutUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlAlert.error(rst.message);
        } else {
          this.wzlAlert.success('注销成功');
          /*登出成功后，自动跳转到登陆界面*/
          this.router.navigate([routers.loginRouter]);
        }
      } else {
        this.wzlAlert.success('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlAlert.error('http请求出现异常，请联系管理员');
    });
  }


  /*Z登陆*/
  login() {
    if (routers.loginRouter) {
      this.router.navigate([routers.loginRouter]);
    } else {
      this.wzlNgZorroAntdMessage.error('登陆路由不存在，请联系管理员');
    }
  }

  // 查询文章
  queryArticleAllInfos(event) {
    //判断如果是回车才进入
    if(event == undefined || asllCode.enter == event.which ){
      this.homeInfo.queryArticleInfosToOut(this.searchParam);
    }
  }

  // 触发事件传递
  emitFun() {
    // 如果组件中，修改了某些数据，需要刷新用用户列表，用户列表在其他组件中，那么就可以发射一个字符串过去，那边接收到这个字符串比对一下，刷新列表。
    this.order[emitKey.emitkey] = emitKey.articleQuery;
    this.order.title = this.searchParam;
    this.emitService.eventEmit.emit(this.order);
  }
}
