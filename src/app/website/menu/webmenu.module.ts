import {NgModule} from '@angular/core';
import {WebmenuComponent} from './webmenu.component';
import {
  MessageService,
} from 'primeng/primeng';
import {WebmenuRouting} from './webmenu.routing';
import {NgZorroAntdModule, NZ_I18N, NzIconService, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlAlertService} from '../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {WebmenuMainComponent} from './main/webmenu.main.component';
import {WzlngzorroantdmessageService} from '../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    WebmenuRouting,
  ],
  declarations: [
    WebmenuComponent,WebmenuMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,NzIconService,WzlngzorroantdmessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WebMenuModule {

}
