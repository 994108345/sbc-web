import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class IndexComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }
}
