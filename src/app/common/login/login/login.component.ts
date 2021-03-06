import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {BaseRoot, PermissionRoot, CommonRouters, successStatus} from '../../service/base/common.config';

@Component({
  template:'<router-outlet></router-outlet>'
})
export class LoginComponent extends AbstractComponent{
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }
}
