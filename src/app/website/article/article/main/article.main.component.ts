import {Component, Injector} from '@angular/core';
import {BreadcrumbOption} from 'ng-zorro-antd';
import {Params} from '@angular/router';
import {cacheKey, routers, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {isPrivateList_conf, statusList_conf} from '../article.config';

@Component({
  selector: 'stody-note',
  templateUrl: './article.main.html',
  styleUrls: ['./article.main.css']
})
export class ArticleMainComponent extends AbstractComponent{

  articleTypeSelect:any[] = [];//文章类型列表
  statusList:any[] = statusList_conf;//状态列表
  isPrivateList:any[] = isPrivateList_conf;//隐私状态列表
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("文章管理界面");
    /*初始化路径*/
    urls.queryUrl = urls.queryArticleUrl;
    /*查询文章*/
    this.queryBySearchParam();
    /*查询文章类型列表*/
    this.queryArticleType();
    /*从缓存中拿出用户信息*/
    this.userInfo = this.wzlCache.getCache(cacheKey.userInfo);
  }

  /**
   * 新增品牌
   */
  addArticle(){
    if(routers.articleAddRouter){
      this.router.navigate([routers.articleAddRouter]);
    }else{
      this.wzlNgZorroAntdMessage.error("新增品牌路由没有配置")
    }
  }

  /*跳到编辑页面*/
  editArticle(data,isEdit){
    this.wzlCache.setCache("article",data);
    if(isEdit){
      this.wzlCache.setCache("isEdit",true);
      this.router.navigate([routers.articleEditRouter]);
    }else{
      this.wzlCache.setCache("isEdit",false);
      this.router.navigate([routers.articleViewRouter]);
    }
  }

  /*查询文章类型列表*/
  queryArticleType(){
    let condition = {isPaging:false};
    this.commonService.doHttpPost(urls.queryArticleTypeUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("查询成功");
          let data = rst.data;
          if(data && data.length > 0){
            for (let articleType of data){
              this.articleTypeSelect.push({value:articleType.articleTypeCode,label:articleType.articleName});
            }
          }else{
            this.wzlNgZorroAntdMessage.error("查询出的文章类型为空");
          }
        }
      }else{
        this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
    })
  }
}
