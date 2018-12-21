import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.main.html',
  styleUrls: ['../../../app.component.css','./menus.main.css']
})
export class MenusMainComponent extends AbstractComponent{

  //菜单栏
  items: MenuItem[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("菜单界面");

    this.items = [
      {
        label: "用户管理",
        icon: 'pi pi-pw pi-file',
        items: [{
          label: '用户信息',
          icon: 'pi pi-fw pi-plus',
          routerLink:'rolemanage'
        },
        ]
      },
      {
        label: "LHB",
        icon: 'pi pi-pw pi-file',
        items: [{
          label: '树洞',
          icon: 'pi pi-fw pi-plus',
          routerLink:'chatboard'
        },
        ]
      },
      {
        label: "demo",
        icon: 'pi pi-pw pi-file',
      },
      {
        label: "demo",
        icon: 'pi pi-pw pi-file',
      },
    ];
  }
}
