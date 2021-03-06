import {ElementRef, Injector, OnDestroy} from '@angular/core';
import {ConfirmationService, DataTable, LazyLoadEvent, Message} from 'primeng/primeng';
import {CommonService} from './base/common.service';
import {WzlAlertService} from '../service/wzlalert/wzlalert.service';
import {Router} from '@angular/router';
import {AppGuardService} from '../guard/app.gurad.service';
import {WzlCacheService} from '../service/wzlcache/wzlceche.service';
import {WzlngzorroantdmessageService} from './wzlngzorroantdmessage/wzlngzorroantdmessage.service';
import {cacheKey, routers, urls} from '../../app.config';
import {successStatus} from './base/common.config';
import {FormBuilder, FormGroup} from '@angular/forms';

/**
 * Created by wenzailong on 2017/12/21.
 */
export class AbstractComponent implements OnDestroy {
  /*屏幕的宽度*/
  //screnWidth:number = screnWidth;
  /*屏幕的长度*/
  //screnHeight:number = screnHeight;
  order: any = {};//一个记录
  orders: any[] = [];//一个记录列表
  commonRouters: any;//页面路由管理
  commonUrls: any;//页面内基本操作的url
  status: any;//后台返回信息的状态
  msgs: Message[] = [];//提示框
  totalRecords: number;//总共记录数
  searchParams: any = {};//查询条件
  table: any;//查询表格
  selectOrder: any;//选择的表单
  msgsDialog: any;//弹出窗的报错信息

  userInfo: any = {};//用户信息

  /*ng-zorro*/
  nzPageIndex: number = 1;//当前页码
  nzSearchParams: any = {};//请求参数
  nzPageSize: number = 10;//一页多少条数据
  dataSet = [];//数据
  selectData = [];//选择的数据
  isPaging: boolean = true;//是否分页
  isFirst: boolean = true;//是否首次加载
  tabName:string = "";//窗体tab的名称
  isEdit:boolean = false;//是否为编辑页面
  ordersInfo: FormGroup;//表单验证实体

  /*-----------------单选框--------------------------*/
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfAllData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  /*===================tag================================*/
  tags = [  ];
  inputVisible = false;
  inputValue = '';
  inputElement: ElementRef;

  /*oss获取上传文件的url*/
  ossUploadUrl:string;

  /*后端返回信息*/
  rst: any = {dat: {}, message: '', status: -10000};

  constructor(public injector: Injector) {
  }

  ngOnInit() {
    console.log("基类");
  }

  /*当页面销毁时*/
  ngOnDestroy() {
    /*localStorage.clear();*/
  }

  /*懒加载方法*/
  loadData(event: LazyLoadEvent) {
    if (this.commonUrls.queryUrl) {
      let condition = this.getQueryCondition(event, this.searchParams);
      this.commonService.doHttpPost(this.commonUrls.queryUrl, condition).then(rtnData => {
        this.status = JSON.parse(rtnData['status']);
        if (this.status && this.status == 10000) {
          this.msgs = this.wzlAlert.success('查找成功');
          /*数据*/
          this.orders = rtnData['data'];
          /*总记录数*/
          this.totalRecords = rtnData['totalRecords'];
          this.wzlAlert.success('查询成功');
        } else {
          this.wzlAlert.error('查找失败，' + rtnData['message']);
        }
      });
    } else {
      this.wzlAlert.info('请求url不存在，请联系管理员！');
    }
  }

  /*获取当前页*/
  getQueryCondition(event: LazyLoadEvent, searchParams: any) {
    let rows = event['rows'];
    let page = Math.floor(event['first'] / rows) + 1;
    console.log(page);
    searchParams.curPage = page;
    searchParams.pageSize = rows;
    return searchParams;
  }

  /*刷新当前页*/
  refresh() {
    if (this.table) {
      this.table.reset();
    }
  }

  /*将对象转化成json字符串对象*/
  toJsonStr(obj: any) {
    let jsonStr = JSON.stringify(obj);
    return jsonStr;
  }

  /*将json字符串转成json对象
  * 注意！转化成是一个json对象数组
  * */
  toJsonObject(json: any) {
    let jsonObj = JSON.parse(json);
    return jsonObj;
  }

  /*将json字符串转成json对象
   * 注意！转化成是一个json对象数组,这里取第一个
   * */
  toJsonObjs(json: any) {
    let jsonObj = JSON.parse(json);
    return jsonObj[0];
  }

  //超时执行
  /*
  setTimeout(() => {
   this.blockedDocument = false;
   }, 3000);
   */

  /*对象转换，防止引用传递*/
  changeObject(a: any) {
    if (!(a instanceof Object) || (a instanceof Array)) {
      return a;
    }
    let b = {};
    for (let attr in a) {
      b[attr] = this.changeObject(a[attr]);
    }
    return b;
  }

  /*是否为大于0的数字*/
  isNumber(data: any) {
    if (!(data >= 0 || data <= 0)) {
      return false;
    }
    return true;
  }

  //校验是否有值
  inputValidation(param: any, menuParam: any, num?: string) {
    if (num) {
      if (!(this.isNumber(this.order[param]))) {
        this.order[param] = '';
        return true;
      }
    }
    if (param) {
      let value = this.order[param];
      if (!value) {
        let isExit = false;
        for (let att of this.msgs) {
          if (att.summary == (menuParam[param] + '_error')) {
            isExit = true;
          }
        }
        if (!isExit) {
          let message = {severity: 'warn', summary: menuParam[param] + '_error', detail: '\'' + menuParam[param] + '\'不能为空'};
          this.msgs.push(message);
          this.msgs = this.wzlAlert.multiple(this.msgs);
        }
      } else {
        for (let i = 0; i < this.msgs.length; i++) {
          let att = this.msgs[i];
          if (att.summary == (menuParam[param] + '_error')) {
            this.msgs.splice(i, i + 1);
            i--;
          }
        }
      }
      if (this.msgs.length == 0) {
        this.wzlAlert.clear();
        return false;
      } else {
        return true;
      }
    } else {
      console.log('校验' + menuParam[param] + '的值时，param为空');
    }
  }

  /**
   * 文本框验证
   * @param value 输入框的值
   * @param valueName 值的中文名
   * @param type 值的类型，默认不传是string，date：时间，number：数字
   */
  inputVerify(value: any, valueName: string, type?: string) {
    if (type) {
      type = 'string';
    }

  }


  /** ----------从DI构造器中手动获取服务-----------*/
  get commonService(): CommonService {
    return this.injector.get(CommonService);
  }

  /*提示信息服务*/
  get wzlAlert(): WzlAlertService {
    return this.injector.get(WzlAlertService);
  }

  /*路由服务*/
  get router(): Router {
    return this.injector.get(Router);
  }

  /*路由守卫服务*/
  get appGuard(): AppGuardService {
    return this.injector.get(AppGuardService);
  }

  /*确认框提示服务*/
  get confirmationService(): ConfirmationService {
    return this.injector.get(ConfirmationService);
  }

  /*缓存服务*/
  get wzlCache(): WzlCacheService {
    return this.injector.get(WzlCacheService);
  }

  /*缓存服务*/
  get wzlNgZorroAntdMessage(): WzlngzorroantdmessageService {
    return this.injector.get(WzlngzorroantdmessageService);
  }

  /*初始化require*/
  /*  requireInstance(){
      var System: any;
      System.import('/assets/js/regular-expresions.js').then(file => {
        file.test();
      });
    }*/

  /*将循环依赖的json对象数组，转换成json字符串*/
  toJsonByRequest(arr: any[]) {
  }

  /*时间格式转换成字符串*/
  dateTostr(date: any): string {
    //let result = moment(date).format('YYYY-MMMM-DD , hh:mm:ss ');
    //return result;
    return null;
  }

  /**
   * 设置分页参数
   */
  ngZorroSearParam() {
    this.nzSearchParams = this.order;
    this.nzSearchParams.curPage = this.nzPageIndex;
    this.nzSearchParams.pageSize = this.nzPageSize;
    this.nzSearchParams.isPaging = true;
    return this.nzSearchParams;
  }

  /*每页数据数目改变*/
  sizeChange(event) {
    if (!this.isFirst) {
      this.nzPageSize = event;
      this.queryBySearchParam();
    }
  }

  /*页码改变*/
  indexChange(event) {
    if (!this.isFirst) {
      this.nzPageIndex = event;
      this.queryBySearchParam();
    }
  }

  /*数据改变*/
  dataChange(event) {
    console.log('数据改变' + event);
  }

  /**
   * 通用查询方法
   */
  queryBySearchParam() {
    let condition = this.ngZorroSearParam();
    this.commonService.doHttpPost(urls.queryUrl, condition).then(rst => {
      if (rst) {
        if (rst.status != successStatus) {
          this.wzlNgZorroAntdMessage.error(rst.message);
        } else {
          this.wzlNgZorroAntdMessage.success('查询成功');
          this.dataSet = rst.data;
          this.totalRecords = rst.totalRecords;
          console.log(rst.totalRecords);
        }
      } else {
        this.wzlNgZorroAntdMessage.error('返回参数异常，请联系管理员');
      }
    }).catch(rtc => {
      this.wzlNgZorroAntdMessage.error('http请求出现异常，请联系管理员');
    }).finally( () => {
      this.isFirst = false;
    });
  }

  /*单选框*/
  currentPageDataChange($event: Array<{ id: number, name: string; age: number; address: string; disabled: boolean }>): void {
    this.selectData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.selectData.filter(item => !item.disabled).every(item => this.mapOfCheckedId[ item.id ]);
    this.isIndeterminate = this.selectData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[ item.id ]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[ item.id ]).length;
  }

  checkAll(value: boolean): void {
    this.selectData.filter(item => !item.disabled).forEach(item => this.mapOfCheckedId[ item.id ] = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => this.mapOfCheckedId[ item.id ] = false);
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }

  /*--------小tag-----------*/
  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [ ...this.tags, this.inputValue ];
    }
    this.inputValue = '';
    this.inputVisible = false;

    this.tagsChange();
  }
  /**
   * 标签改变
   * @param event
   */
  tagsChange(){
  }

  statusChange(value,list):string{
    for (let status of list){
      if(status.value == value){
        return status.label;
      }
    }
    return '';
  }

  /**
   * 数组删除指定元素
   * @param dataArr 原数组
   * @param deleteMap 需要删除的数组元素集合,用map表示，value和key一样
   */
  arrRemoveDatas(dataArr, deleteMap){
    let result= new Array();
    for(let data of dataArr){
      if(deleteMap.get(data)){

      }else{
        result.push(data);
      }
    }
    return result;
  }

  arrRemoveOneData(dataArr,value){
    let result= new Array();
    for(let data of dataArr){
      if(value != data){
        result.push(data);
      }
    }
    return result;
  }

  /*数组转成map*/
  arrToMap(arr){
    let map = new Map();
    if(arr){
      for(let ar of arr){
        map.set(ar,ar);
      }
    }
    return map;
  }

  /*重置查询参数*/
  reSetParam(){

  }

  /*跳转主页*/
  goHome(){
    if(routers.webRouter){
      this.router.navigate([routers.homeRouter]);
    }else{
      this.wzlNgZorroAntdMessage.error("主页跳转路径没有配置，请联系管理员");
    }
  }

  /*查询文章列表*/
  getArticleAllInfos(){

  }
}
