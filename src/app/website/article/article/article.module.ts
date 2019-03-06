import {NgModule} from '@angular/core';
import {
  EditorModule,
  MessageService,
} from 'primeng/primeng';
import {NgZorroAntdModule, NZ_I18N, NzNotificationService, NzTableModule, zh_CN} from 'ng-zorro-antd';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import zh from '@angular/common/locales/zh';
import {ArticleMainComponent} from './main/article.main.component';
import {ArticleComponent} from './article.component';
import {ArticleRouter} from './article.router';
import {CommonService} from '../../../common/service/base/common.service';
import {WzlAlertService} from '../../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../../common/service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from '../../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {ArticleAddComponent} from './add/article.add.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
registerLocaleData(zh);
@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    /*响应式表单*/
    ReactiveFormsModule,
    /*富文本编辑器*/
    EditorModule,
    CKEditorModule,
    ArticleRouter
  ],
  declarations: [
    ArticleMainComponent,ArticleComponent,ArticleAddComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN },WzlngzorroantdmessageService],
})
export class ArticleModule {

}
