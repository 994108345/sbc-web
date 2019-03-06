import {Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'brand-add',
  templateUrl: './brand.add.html',
  styleUrls: ['./brand.add.css'],
  encapsulation: ViewEncapsulation.None
})
export class BrandAddComponent extends AbstractComponent{
  brandInfo: FormGroup;

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("品牌添加页面")

    /*初始化参数*/
    this.brandInfo = this.fb.group({
      brandName: [ null, [ Validators.required ] ],
      status: [ '1', [ Validators.required ] ],
      remark: [ null],
    });
  }

  /*校验字段*/
  validAddBrandInfo(): void {
    for (const i in this.brandInfo.controls) {
      this.brandInfo.controls[ i ].markAsDirty();
      this.brandInfo.controls[ i ].updateValueAndValidity();
    }
    if(this.brandInfo.valid){
      this.addBrandById();
    }
  }
  /*添加品牌*/
  addBrandById(){
      let condition =this.brandInfo.value;
      this.commonService.doHttpPost(urls.addBrandUtl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.wzlNgZorroAntdMessage.success("添加成功");
            rst.data
            this.router.navigate([routers.brandRouter]);
          }
        }else{
          this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
  }
}
