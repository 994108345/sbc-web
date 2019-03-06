import {Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {routers, urls} from '../../../../app.config';

@Component({
  selector: 'articletype-add',
  templateUrl: './articletype.edit.html',
  styleUrls: ['./articletype.edit.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticletypeEditComponent extends AbstractComponent{

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("品牌编辑页面")
    /*取id*/
    this.order = this.wzlCache.getCache("articleType")
    /*是否为编辑页面*/
    this.isEdit = this.wzlCache.getCache("isEdit");
    if(this.isEdit){
      this.tabName = "编辑";
    }else{
      this.tabName = "查看";
    }

    /*查询品牌信息*/
    this.queryOneBrand();

    /*初始化参数*/
    this.ordersInfo = this.fb.group({
      articleName: [ this.order.articleName, [ Validators.required ] ],
      status: [ this.order.status, [ Validators.required ] ],
      remark: [ this.order.remark],
      createTime: [ this.order.createTime, [ Validators.required ] ],
      lastModifiedTime: [ this.order.lastModifiedTime, [ Validators.required ] ],
      createUser: [ this.order.createUser ],
      lastModifiedUser: [ this.order.lastModifiedUser ],
    });
  }

  /*校验字段*/
  validAddArticleType(): void {
    for (const i in this.ordersInfo.controls) {
      this.ordersInfo.controls[ i ].markAsDirty();
      this.ordersInfo.controls[ i ].updateValueAndValidity();
    }
    if(this.ordersInfo.valid){
      /*更新品牌*/
      this.updateArticleType();
    }
  }
  /*更新品牌*/
  updateArticleType(){
      let condition =this.ordersInfo.value;
      condition.id = this.order.id;
      this.commonService.doHttpPost(urls.updateArticleTypeUrl,condition).then(rst => {
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

  /*查询一个优惠信息*/
  queryOneBrand(){
    let condition ={"id":this.order.id};
    this.commonService.doHttpPost(urls.queryArticleTypeUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("查询成功");
          this.order = rst.data[0];
        }
      }else{
        this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员"+rtc.toString());
    }).finally(()=>{

    })
  }
}
