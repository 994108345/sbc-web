import {Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'brand-add',
  templateUrl: './brand.edit.html',
  styleUrls: ['./brand.edit.css'],
  encapsulation: ViewEncapsulation.None
})
export class BrandEditComponent extends AbstractComponent{
  brandInfo: FormGroup;

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("品牌编辑页面")
    /*取id*/
    this.order = this.wzlCache.getCache("brand")
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
    this.brandInfo = this.fb.group({
      brandName: [ this.order.brandName, [ Validators.required ] ],
      status: [ this.order.status, [ Validators.required ] ],
      remark: [ this.order.remark],
      createTime: [ this.order.createTime, [ Validators.required ] ],
      lastModifiedTime: [ this.order.lastModifiedTime, [ Validators.required ] ],
      createUser: [ this.order.createUser, [ Validators.required ] ],
      lastModifiedUser: [ this.order.lastModifiedUser, [ Validators.required ] ],
    });
  }

  /*校验字段*/
  validAddBrandInfo(): void {
    for (const i in this.brandInfo.controls) {
      this.brandInfo.controls[ i ].markAsDirty();
      this.brandInfo.controls[ i ].updateValueAndValidity();
    }
    if(this.brandInfo.valid){
      /*更新品牌*/
      this.updateBrand();
    }
  }
  /*更新品牌*/
  updateBrand(){
      let condition =this.order;
      this.commonService.doHttpPost(urls.updateBrandUtl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.wzlNgZorroAntdMessage.success("添加成功");
            this.router.navigate([routers.brandRouter]);
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
    this.commonService.doHttpPost(urls.queryBrandByParamUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlNgZorroAntdMessage.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("查询成功");
          this.order = rst.data;
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
