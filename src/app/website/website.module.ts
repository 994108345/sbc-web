import {NgModule} from '@angular/core';
import {
  MessageService,
} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
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
import {ArticletypeModule} from './article/articletype/articletype.module';
import {ArticleModule} from './article/article/article.module';
import {WebMenuModule} from "./menu/webmenu.module";

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
    ArticleModule,
    ArticletypeModule,
    DemoModule,
  ],
  declarations: [
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class WebSiteModule {

}
