import { Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../../common/service/abstract.component';
import {routers, urls} from '../../../../app.config';
import {successStatus} from '../../../../common/service/base/common.config';
import {statusList_conf} from '../user.config';

@Component({
  selector: 'web-user-main',
  templateUrl: './user.main.html',
  styleUrls: ['./user.main.css']
})
export class UserMainComponent extends AbstractComponent{

  statusList:any[] = statusList_conf;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log('用户界面');
  }

  /*登出（注销）*/
  loginOut() {
    const condition = {};
    this.commonService.doHttpPost(urls.queryUserInfos, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlAlert.error(rst.message);
        } else {
          this.dataSet = rst.data;
          this.totalRecords = rst.totalRecords;
        }
      } else {
        this.wzlAlert.success('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlAlert.error('http请求出现异常，请联系管理员');
    });
  }
}
