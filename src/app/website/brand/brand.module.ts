import {NgModule} from '@angular/core';
import {BrandComponent} from './brand.component';
import {
  MessageService,
} from 'primeng/primeng';
import {NgZorroAntdModule, NZ_I18N, NzNotificationService, NzTableModule, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlAlertService} from '../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {BrandMainComponent} from './main/brand.main.component';
import {BrandRouting} from './brand.routing';
import {CommonModule, registerLocaleData} from '@angular/common';
import {WzlngzorroantdmessageService} from '../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {BrandAddComponent} from './add/brand.add.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrandEditComponent} from './edit/brand.edit.component';
import zh from '@angular/common/locales/zh';
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
    BrandRouting
  ],
  declarations: [
    BrandComponent,BrandMainComponent,BrandAddComponent,BrandEditComponent,
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN },WzlngzorroantdmessageService],
})
export class BrandModule {

}
