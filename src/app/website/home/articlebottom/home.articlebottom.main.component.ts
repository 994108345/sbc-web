import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {cacheKey, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-home-articlebottom-main',
  templateUrl: './home.articlebottom.main.html',
  styleUrls: ['./home.articlebottom.main.css']
})
export class HomeArticlebottomMainComponent extends AbstractComponent{


  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("文章单独显示底层");

  }

  /*查询文章信息列表*/
  queryArticleAllInfo(){
    if(urls.queryArticleAllInfoUrl){
      let condition = this.order;
      this.commonService.doHttpPost(urls.queryArticleAllInfoUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            /*将文章内容回显*/
            this.order = rst.data;
          }
        }else{
          this.wzlNgZorroAntdMessage.success("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
    }
  }
}
