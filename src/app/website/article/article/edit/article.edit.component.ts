import {Component, ElementRef, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {cacheKey, routers, urls} from '../../../../app.config';

@Component({
  selector: 'article-edit',
  templateUrl: './article.edit.html',
  styleUrls: ['./article.edit.css'],
  encapsulation: ViewEncapsulation.None
})

export class ArticleEditComponent extends AbstractComponent{
  @ViewChild('inputElement') inputElement: ElementRef;

  articleTypeSelect:any[] = [];//文章类型列表
  isTagsShow:boolean = false;//标签是否已经达到五个

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("文章添加页面")
    /*取id*/
    this.order = this.wzlCache.getCache("article");

    /*查询文章类型*/
    this.queryArticleType();
    /*查询文章内容*/
    this.queryArticle();
    /*从缓存中拿出用户信息*/
    this.userInfo = this.wzlCache.getCache(cacheKey.userInfo);

    /*初始化参数*/
    this.tags = this.order.tags.split(",");
    this.ordersInfo = this.fb.group({
      title: [ this.order.title, [ Validators.required ]],
      status: [ this.order.status, [ Validators.required ] ],
      tags:[ [ Validators.required ]],
      tag:[],
      content:[this.order.content, [ Validators.required ]],
      articleType:[this.order.articleType, [ Validators.required ]],
      remark: [ this.order.remark],
      isPrivate: [ this.order.isPrivate, [ Validators.required ]],
      createTime: [ this.order.createTime, [ Validators.required ] ],
      lastModifiedTime: [ this.order.lastModifiedTime, [ Validators.required ] ],
      createUser: [ this.order.createUser ],
      lastModifiedUser: [ this.order.lastModifiedUser ],
    });
  }

  /*校验字段*/
  validAddBrandInfo(): void {
    for (const i in this.ordersInfo.controls) {
      this.ordersInfo.controls[ i ].markAsDirty();
      this.ordersInfo.controls[ i ].updateValueAndValidity();
    }
    if(this.ordersInfo.valid){
      this.updateOneArticle();
    }
  }
  /*添加文章*/
  updateOneArticle(){
      let condition =this.ordersInfo.value;
      condition.id = this.order.id;
      condition.tags = condition.tags.join(",");
      this.commonService.doHttpPost(urls.updateArticleUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.wzlNgZorroAntdMessage.success("添加成功");
            this.router.navigate([routers.articleRouter]);
          }
        }else{
          this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
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

  /*查询文章那日图*/
  queryArticle(){
    let condition = {isPaging:false,id:this.order.id};
    this.commonService.doHttpPost(urls.queryArticleUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("查询成功");
          let data = rst.data;
          if(data && data.length > 0){
            this.order = data[0];
          }else{
            this.wzlNgZorroAntdMessage.error("查询出的文章为空");
          }
        }
      }else{
        this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
    })
  }

  onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  /**
   * 标签改变
   * @param event
   */
  tagsChange(){
    if(this.tags){
      if(this.tags.length < 5){
        this.isTagsShow = false;
      }else if(this.tags.length == 5){
        this.isTagsShow = true;
      }
    }
  }

}
