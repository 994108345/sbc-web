import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../service/abstract.component';
import {BizRoot, successStatus} from '../service/base/common.config';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.html',
  styleUrls: ['../../app.component.css','./menus.css']
})
export class MenusComponent extends AbstractComponent{

  //菜单栏
  items: MenuItem[];

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("菜单界面");

    this.commonUrls = {
      loginUrl:BizRoot + "/Login/login",
    };

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
          routerLink:'rolemanage'
        },
        ]
      },
    ];

  }
  
  redictRouter(router:any){
    let routerStr = 'app/'+router;
    if (router) {
      this.router.navigate([routerStr]);
    } else {
      this.msgs = this.wzlAlert.info("请求url不存在，请联系管理员！")
    }
  }

  login(){
    let condition = null;
    this.commonService.doHttpPost(this.commonUrls.loginUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.msgs = this.wzlAlert.error(rst.message);
        }else{

          this.msgs = this.wzlAlert.success("登陆成功");
        }

      }else{
        this.msgs = this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.msgs = this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }
}
