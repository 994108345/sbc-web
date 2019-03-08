import {Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {successStatus} from '../../../../common/service/base/common.config';
import {cacheKey, routers, urls} from '../../../../app.config';

@Component({
  selector: 'articletype-add',
  templateUrl: './articletype.add.html',
  styleUrls: ['./articletype.add.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticletypeAddComponent extends AbstractComponent{
  brandInfo: FormGroup;

  constructor(public injector:Injector,private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    console.log("文章类型添加页面")
    /*从缓存中拿出用户信息*/
    this.userInfo = this.wzlCache.getCache(cacheKey.userInfo);

    /*初始化参数*/
    this.ordersInfo = this.fb.group({
      articleName: [ null, [ Validators.required ] ],
      status: [ '1', [ Validators.required ] ],
      remark: [ null],
    });
  }

  /*校验字段*/
  validAddBrandInfo(): void {
    for (const i in this.ordersInfo.controls) {
      this.ordersInfo.controls[ i ].markAsDirty();
      this.ordersInfo.controls[ i ].updateValueAndValidity();
    }
    if(this.ordersInfo.valid){
      this.addOneArticleType();
    }
  }
  /*添加品牌*/
  addOneArticleType(){
      let condition =this.ordersInfo.value;
    condition.lastModifiedUser = this.order.userName;
    condition.createUser = this.order.userName;
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
}
