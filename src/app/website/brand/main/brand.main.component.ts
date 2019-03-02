import {Component, Injector, ViewChild} from '@angular/core';
import {routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {brand_field} from '../brand.config';

@Component({
  selector: 'brand-main',
  templateUrl: './brand.main.html',
  styleUrls: ['./brand.main.css']
})

export class BrandMainComponent extends AbstractComponent{
  @ViewChild('nzTable') table: any;

  //标题
  brandFields = [];

  displayData = []; 

  /*前端选择框*/
  allChecked:boolean = false;
  indeterminate:boolean = false;


  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit() {
    console.log("品牌管理界面");
    /*初始化字段*/
    this.brandFields = brand_field;
    /*初始化路径*/
    urls.queryUrl = urls.queryBrandByPageUrl;
    /*查询*/
    this.queryBySearchParam();
  }

  /**
   * 新增品牌
   */
  addBrand(){
    if(routers.brandAddRouter){
      this.router.navigate([routers.brandAddRouter]);
    }else{
      this.wzlNgZorroAntdMessage.error("新增品牌路由没有配置")
    }
  }

  /*跳到编辑页面*/
  editBrand(data,isEdit){
    this.wzlCache.setCache("brand",data);
    if(isEdit){
      this.wzlCache.setCache("isEdit",true);
      this.router.navigate([routers.brandEditRouter]);
    }else{
      this.wzlCache.setCache("isEdit",false);
      this.router.navigate([routers.brandViewRouter]);
    }
  }
}
