import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.router';
import {WzlAlertService} from './common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from './common/service/wzlcache/wzlceche.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {MenusModule} from './common/menus/menus.module';
import {MomentModule} from 'angular2-moment';
import {LoginInterceptor} from './common/interceptor/login.Interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /*动画支持模块*/
    BrowserAnimationsModule,
    /*浏览器模块*/
    BrowserModule,
    /*http请求模块*/
    HttpClientModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /*自己建的路由模块*/
    AppRoutingModule,

  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [WzlAlertService,WzlCacheService,{ provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
