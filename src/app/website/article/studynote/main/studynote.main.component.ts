import {Component, Injector} from '@angular/core';
import {BreadcrumbOption} from 'ng-zorro-antd';
import {Params} from '@angular/router';
import {routers} from '../../../../app.config';
import {AbstractComponent} from '../../../../common/service/abstract.component';

@Component({
  selector: 'stody-note',
  templateUrl: './studynote.main.html',
  styleUrls: ['./studynote.main.css']
})
export class StudynoteMainComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("学习笔记界面");
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
