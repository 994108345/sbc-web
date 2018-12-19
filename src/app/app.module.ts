import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PagenotfoundModule} from './common/login/pagenotfound/pagenotfound.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.router';
import {LoginModule} from './common/login/login/login.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WzlAlertService} from './common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from './common/service/wzlcache/wzlceche.service';
import {MessageModule, MessagesModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {MenusModule} from './common/menus/menus.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /*浏览器模块*/
    BrowserModule,
    /*http请求模块*/
    HttpClientModule,
    /*消息提示模块*/
    MessagesModule,
    MessageModule,
    ToastModule,
    /*-------------自己写的模块-----------------------------*/
    /*登陆模块*/
    LoginModule,
    /*菜单页面模块*/
    MenusModule,
    /*自己建的路由模块*/
    AppRoutingModule,
  ],
  providers: [WzlAlertService,WzlCacheService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
