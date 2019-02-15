import {Component, Injector} from '@angular/core';
import {urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {brand_field} from '../brand.config';

@Component({
  selector: 'web-menus',
  templateUrl: './brand.main.html',
  styleUrls: ['./brand.main.css']
})
export class BrandMainComponent extends AbstractComponent{
  //数据
  dataSet = [];
  //标题
  brandFields = [];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit() {
    console.log("品牌管理界面");

    /*初始化字段*/
    this.brandFields = brand_field;

    /*查询*/
    this.queryBrand();

  }

  /*查询*/
  queryBrand(){
    let condition ={};
    this.commonService.doHttpPost(urls.queryBrandUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("查询成功");
          this.dataSet = rst.data;
          this.totalRecords = rst.totalRecords;
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }

}
