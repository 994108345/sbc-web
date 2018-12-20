import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../service/abstract.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.main.html',
  styleUrls: ['../../../../app.component.css','./index.main.css']
})
export class IndexMainComponent extends AbstractComponent{

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit(){
    console.log("index界面");
  }
}
