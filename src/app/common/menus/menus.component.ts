import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from '../service/abstract.component';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class MenusComponent extends AbstractComponent implements  OnInit{
  constructor(injector:Injector){
    super(injector);
  }
  ngOnInit() {
    console.log("菜单进来了吗");
  }
}
