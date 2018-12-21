import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.router';
import {WzlAlertService} from './common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from './common/service/wzlcache/wzlceche.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    /*自己建的路由模块*/
    AppRoutingModule,

  ],
  providers: [WzlAlertService,WzlCacheService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
