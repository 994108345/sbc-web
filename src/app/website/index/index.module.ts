import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {
  ButtonModule,
  InputTextModule,
  MenuModule,
  MessageModule,
  MessageService,
  MessagesModule,
  PanelMenuModule,
  PasswordModule
} from 'primeng/primeng';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlAlertService} from '../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {IndexMainComponent} from './main/index.main.component';
import {IndexRouting} from './index.routing';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    IndexRouting,
  ],
  declarations: [
    IndexComponent,IndexMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class IndexModule {

}
