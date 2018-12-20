import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PagenotfoundComponent} from './pagenotfound.component';
import {PagenotfoundRouterModule} from './pagenotfound.routing';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    /*http请求模块*/
    HttpClientModule,

    PagenotfoundRouterModule,
  ],
  providers: [],
})
export class PagenotfoundModule {

}
