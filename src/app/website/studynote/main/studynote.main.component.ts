import {Component, Injector} from '@angular/core';
import {cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {BreadcrumbOption} from 'ng-zorro-antd';
import {Params} from '@angular/router';

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
}
