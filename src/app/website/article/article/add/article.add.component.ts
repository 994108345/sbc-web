import {Component, ElementRef, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {cacheKey, routers, urls} from '../../../../app.config';

@Component({
  selector: 'article-add',
  templateUrl: './article.add.html',
  styleUrls: ['./article.add.css'],
  encapsulation: ViewEncapsulation.None
})

export class ArticleAddComponent extends AbstractComponent{
  @ViewChild('inputElement') inputElement: ElementRef;

  articleTypeSelect:any[] = [];//文章类型列表
  isTagsShow:boolean = false;//标签是否已经达到五个
  /*-------个人分类的标签------*/
  articlePersonalClassification = [];
  inputVisiblePc = false;
  inputValuePc = '';
  inputElementPc: ElementRef;
  isTagsShowPc:boolean = false;//标签是否已经达到五个

  multiSelectTags:any[] = [];

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("文章添加页面")
    /*从缓存中拿出用户信息*/
    this.userInfo = this.wzlCache.getCache(cacheKey.userInfo);

    /*初始化参数*/
    this.ordersInfo = this.fb.group({
      title: [ null, [ Validators.required ]],
      status: [ '1', [ Validators.required ] ],
      tags:[null, [ Validators.required ]],
      tag:[null],
      articlePersonalClassification:[null, [ Validators.required ]],
      tagPc:[null],
      content:[null, [ Validators.required ]],
      articleType:[null, [ Validators.required ]],
      remark: [ null],
      isPrivate: [ '0', [ Validators.required ]],
      multiSelectTags:[null],
    });
    /*查询文章类型*/
     this.queryArticleType();
     /*查询个人分类*/
    this.queryPersionClass();
  }

  /*校验字段*/
  validAddBrandInfo(): void {
    for (const i in this.ordersInfo.controls) {
      this.ordersInfo.controls[ i ].markAsDirty();
      this.ordersInfo.controls[ i ].updateValueAndValidity();
    }
    if(this.ordersInfo.valid){
      this.addOneArticle();
    }
  }
  /*添加文章*/
  addOneArticle(){
      let condition =this.ordersInfo.value;
      /*设置默认用户id*/
      condition.userId = this.userInfo.id;
      condition.author = this.userInfo.userName;
      condition.createUser = this.userInfo.userName;
      condition.lastModifiedUser = this.userInfo.userName;
      condition.tags = condition.tags.join(",");
      condition.articlePersonalClassification = condition.articlePersonalClassification.join(",");
      this.commonService.doHttpPost(urls.insertArticleUrl,condition).then(rst => {
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

  /*查询个人分类*/
  queryPersionClass(){
    let condition = {};
    this.commonService.doHttpPost(urls.queryPersionClassUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("查询成功");
          let data = rst.data;
          if(data && data.length > 0){
            let articlePc = data[0];
            let arrPcStr = articlePc.persionClassification;
            if(arrPcStr){
              let arrPc = arrPcStr.split(",");
              for (let articleType of arrPc){
                this.multiSelectTags.push({value:articleType,label:articleType});
              }
            }
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

  /*------------个人标签页-------------*/
  handleClosePc(removedTag: {}): void {
    this.articlePersonalClassification = this.articlePersonalClassification.filter(tag => tag !== removedTag);
  }

  showInputPc(): void {
    this.inputVisiblePc = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirmPc(): void {
    if (this.inputValuePc && this.articlePersonalClassification.indexOf(this.inputValuePc) === -1) {
      this.articlePersonalClassification = [ ...this.articlePersonalClassification, this.inputValuePc ];
    }
    this.inputValuePc = '';
    this.inputVisiblePc = false;
    this.tagsChangePc();
  }

  /**
   * 标签改变
   * @param event
   */
  tagsChangePc(){
    if(this.articlePersonalClassification){
      if(this.articlePersonalClassification.length < 5){
        this.isTagsShowPc = false;
      }else if(this.articlePersonalClassification.length == 5){
        this.isTagsShowPc = true;
      }
    }
  }
  /*多选*/
  selectMultiData(value:object[]):void{
    let select  = [];
    for(let data of value){
      if(data["checked"] == true){
        select.push(data["value"]);
      }
    }
    /*匹配*/
    for (let tag of this.tags){

    }
  }

}
