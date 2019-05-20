import {NgModule} from '@angular/core';
import {
   EditorModule,
  MessageService,
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {UserComponent} from './user.component';
import {UserRouting} from './user.routing';
import {CommonService} from '../../../common/service/base/common.service';
import {WzlAlertService} from '../../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../../common/service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from '../../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {UserMainComponent} from './main/user.main.component';

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
    UserRouting,
  ],
  declarations: [
    UserComponent,UserMainComponent
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN },WzlngzorroantdmessageService],
})
export class UserModule {

}
