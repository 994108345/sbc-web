import {Component, Injector} from '@angular/core';
import {routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {brand_field} from '../demo.config';

@Component({
  selector: 'brand-main',
  templateUrl: './demo.main.html',
  styleUrls: ['./demo.main.css']
})
export class DemoMainComponent extends AbstractComponent{
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
    this.commonService.doHttpPost(urls.queryBrandByPageUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlNgZorroAntdMessage.success("查询成功");
          this.dataSet = rst.data;
          this.totalRecords = rst.totalRecords;
        }
      }else{
        this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
    })
  }

  /**
   * 新增品牌
   */
  addBrand(){
    if(routers){
      this.router.navigate([routers.demoAddRouter]);
    }else{
      this.wzlNgZorroAntdMessage.error("新增品牌路由没有配置")
    }

  }

}
