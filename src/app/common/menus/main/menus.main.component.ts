import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../service/abstract.component';
import {MenuItem} from 'primeng/api';
import {cacheKey, routers, urls} from '../../../app.config';
import {successStatus} from '../../service/base/common.config';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.main.html',
  styleUrls: ['./menus.main.css']
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
        label: "Redis",
        icon: 'pi pi-pw pi-file',
        items: [{
          label: '秒杀',
          icon: 'pi pi-fw pi-plus',
          routerLink:'redis/seckill'
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
    /*从缓存中拿出用户信息*/
    this.userInfo = this.wzlCache.getCache(cacheKey.userInfo);

  }

  /*登出（注销）*/
  loginOut(){
    let condition = {};
    this.commonService.doHttpPost(urls.loginOutUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("注销成功");
          /*登出成功后，自动跳转到登陆界面*/
          this.router.navigate([routers.loginRouter]);
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }
}
