import {Component, ElementRef, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {routers, urls} from '../../../../app.config';

@Component({
  selector: 'article-add',
  templateUrl: './article.add.html',
  styleUrls: ['./article.add.css'],
  encapsulation: ViewEncapsulation.None
})

export class ArticleAddComponent extends AbstractComponent{
  @ViewChild('inputElement') inputElement: ElementRef;

  textContent:string;//富文本编辑器内容
  ckeditorContent:any;//富文本编辑器


  model = {
    editorData: '<p>Hello, world!</p>'
  };
  articleTypeSelect:any[] = [];

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("文章添加页面")

    /*初始化参数*/
    this.ordersInfo = this.fb.group({
      articleName: [ null, [ Validators.required ]],
      status: [ '1', [ Validators.required ] ],
      tags:[null, [ Validators.required ]],
      content:[null, [ Validators.required ]],
      articleType:[null, [ Validators.required ]],
      remark: [ null],
    });
    /*查询文章类型*/
     this.queryArticleType();
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
      let tag = this.ordersInfo.value.tag;
      //condition.tag = tag.join(',');
      this.commonService.doHttpPost(urls.insertArticleTypeUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.wzlNgZorroAntdMessage.success("添加成功");
            this.router.navigate([routers.articleTypeRouter]);
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

  onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

}
