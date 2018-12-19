import {Component, Injector} from '@angular/core';
import {AbstractComponent} from './common/service/abstract.component';
import {Message, MessageService} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractComponent{
  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }
}
