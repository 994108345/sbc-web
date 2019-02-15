import {NgModule} from '@angular/core';
import {BrandComponent} from './brand.component';
import {
  MessageService,
} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzTableModule, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlAlertService} from '../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {BrandMainComponent} from './main/brand.main.component';
import {BrandRouting} from './brand.routing';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    BrandRouting
  ],
  declarations: [
    BrandComponent,BrandMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class BrandModule {

}
