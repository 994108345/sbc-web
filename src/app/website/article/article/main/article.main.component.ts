import {Component, Injector} from '@angular/core';
import {BreadcrumbOption} from 'ng-zorro-antd';
import {Params} from '@angular/router';
import {routers, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';

@Component({
  selector: 'stody-note',
  templateUrl: './article.main.html',
  styleUrls: ['./article.main.css']
})
export class ArticleMainComponent extends AbstractComponent{


  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("学习笔记界面");
    /*初始化路径*/
    urls.queryUrl = urls.queryArticleTypeUrl;
    /*查询*/
    this.queryBySearchParam();
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
  editArticleType(data,isEdit){
    this.wzlCache.setCache("articleType",data);
    if(isEdit){
      this.wzlCache.setCache("isEdit",true);
      this.router.navigate([routers.articleTypeEditRouter]);
    }else{
      this.wzlCache.setCache("isEdit",false);
      this.router.navigate([routers.articleTypeViewRouter]);
    }
  }
}
