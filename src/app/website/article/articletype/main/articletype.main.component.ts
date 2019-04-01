import {Component, Injector} from '@angular/core';
import {BreadcrumbOption} from 'ng-zorro-antd';
import {Params} from '@angular/router';
import {routers, urls} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';

@Component({
  selector: 'stody-note',
  templateUrl: './articletype.main.html',
  styleUrls: ['./articletype.main.css']
})
export class ArticletypeMainComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("文章类型界面");
    /*初始化路径*/
    urls.queryUrl = urls.queryArticleTypeUrl;
    /*查询*/
    this.queryBySearchParam();
  }

  /**
   * 新增品牌
   */
  addArticleType(){
    if(routers.articleTypeAddRouter){
      this.router.navigate([routers.articleTypeAddRouter]);
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

  /**
   * 删除文章类型
   */
  deleteArticleType(data){
    if(urls.deleteArticleTypeUrl){
      let condition = {articleTypeCode:data.articleTypeCode};
      this.commonService.doHttpPost(urls.deleteArticleTypeUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.wzlNgZorroAntdMessage.success('删除成功');
            this.queryBySearchParam();
          }
        }else{
          this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
    }else{
      this.wzlNgZorroAntdMessage.error("路由没有配置，请联系管理员");
    }
  }
}
