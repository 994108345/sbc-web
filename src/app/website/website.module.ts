import {NgModule} from '@angular/core';
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
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {IndexModule} from './index/index.module';
import {CommonService} from '../common/service/base/common.service';
import {WzlAlertService} from '../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../common/service/wzlcache/wzlceche.service';
import {BrandModule} from './brand/brand.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {DemoModule} from './demo/demo.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /*功能模块*/
    WebMenuModule,
    IndexModule,
    BrandModule,
    DemoModule,
  ],
  declarations: [
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WebMenuModule {

}
