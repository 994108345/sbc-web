import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {
  MessageService,
} from 'primeng/primeng';
import {NgZorroAntdModule, NZ_I18N, NzNotificationService, NzTableModule, zh_CN} from 'ng-zorro-antd';
import {CommonService} from '../../common/service/base/common.service';
import {WzlAlertService} from '../../common/service/wzlalert/wzlalert.service';
import {WzlCacheService} from '../../common/service/wzlcache/wzlceche.service';
import {DemoMainComponent} from './main/demo.main.component';
import {DemoRouting} from './demo.routing';
import {CommonModule} from '@angular/common';
import {WzlngzorroantdmessageService} from '../../common/service/wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {DemoAddComponent} from './add/demo.add.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@NgModule({
  imports: [
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    CommonModule,
    /*表单模块，要使用ngModel，就要使用这个模块*/
    FormsModule,
    ReactiveFormsModule,
    DemoRouting
  ],
  declarations: [
    DemoComponent,DemoMainComponent,DemoAddComponent,
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [CommonService,WzlAlertService,WzlCacheService,MessageService,{ provide: NZ_I18N, useValue: zh_CN },WzlngzorroantdmessageService],
})
export class DemoModule {

}
