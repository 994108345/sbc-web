import {NgModule} from '@angular/core';
import {
  EditorModule,
  MessageService,
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {HomeIndexMainComponent} from './main/home.index.main.component';
import {HomeIndexRouting} from './home.index.routing';
import {HomeIndexComponent} from './home.index.component';
import {CommonService} from '../../../common/service/base/common.service';
import {WzlAlertService} from '../../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../../common/service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from '../../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {EmitService} from '../../../common/service/emit/emit.service';

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
    HomeIndexRouting,
  ],
  declarations: [
    HomeIndexMainComponent,HomeIndexComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN },WzlngzorroantdmessageService,EmitService],
})
export class HomeIndexModule {

}
