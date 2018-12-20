import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.html',
  styleUrls: ['../../../app.component.css']
})
export class PagenotfoundComponent extends AbstractComponent{
  constructor(public injector:Injector){
    super(injector);
  }
}
