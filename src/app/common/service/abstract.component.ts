import {Injector, OnDestroy} from "@angular/core";
import {ConfirmationService, DataTable, LazyLoadEvent, Message} from "primeng/primeng";
import {CommonService} from "./base/common.service";
import {WzlAlertService} from "../service/wzlalert/wzlalert.service";
import {Router} from "@angular/router";
import {AppGuardService} from "../guard/app.gurad.service";
import {WzlCacheService} from "../service/wzlcache/wzlceche.service";
import {msgInfo} from './wzlalert/wzlalert.config';
/**
 * Created by wenzailong on 2017/12/21.
 */
export class AbstractComponent implements OnDestroy{
  /*屏幕的宽度*/
  //screnWidth:number = screnWidth;
  /*屏幕的长度*/
  //screnHeight:number = screnHeight;
  order:any = {};//一个记录
  orders:any[] = [];//一个记录列表
  commonRouters:any;//页面路由管理
  commonUrls: any;//页面内基本操作的url
  status:any;//后台返回信息的状态
  msgs:Message[] = [];//提示框
  totalRecords:number ;//总共记录数
  searchParams: any = {};//查询条件
  table: any;//查询表格
  selectOrder:any;//选择的表单
  msgsDialog:any;//弹出窗的报错信息

  userInfo:any = {};//用户信息

  /*后端返回信息*/
  rst:any = {dat:{},message:"",status:-10000};

  constructor(public injector: Injector) {
  }

  ngOnInit(){
  }
  /*当页面销毁时*/
  ngOnDestroy() {
    /*localStorage.clear();*/
  }
  /*懒加载方法*/
  loadData(event: LazyLoadEvent) {
    if (this.commonUrls.queryUrl) {
      let condition = this.getQueryCondition(event,this.searchParams);
      this.commonService.doHttpPost(this.commonUrls.queryUrl, condition).then(rtnData => {
        this.status = JSON.parse(rtnData['status']);
        if(this.status && this.status==10000){
          this.msgs = this.wzlAlert.success("查找成功");
          /*数据*/
          this.orders = rtnData['data'];
          /*总记录数*/
          this.totalRecords = rtnData['totalRecords'];
          this.wzlAlert.success("查询成功");
        }else{
          this.wzlAlert.error("查找失败，"+rtnData['message']);
        }
      })
    } else {
      this.wzlAlert.info("请求url不存在，请联系管理员！")
    }
  }

  /*获取当前页*/
  getQueryCondition(event: LazyLoadEvent,searchParams:any){
    let rows = event["rows"];
    let page = Math.floor(event["first"] / rows) + 1;
    console.log(page);
    searchParams.curPage = page;
    searchParams.pageSize = rows;
    return searchParams;
  }
  /*刷新当前页*/
  refresh(){
    if(this.table){
      this.table.reset();
    }
  }

  /*将对象转化成json字符串对象*/
  toJsonStr(obj:any){
    let jsonStr = JSON.stringify(obj);
    return jsonStr;
  }

  /*将json字符串转成json对象
  * 注意！转化成是一个json对象数组
  * */
  toJsonObject(json:any){
    let jsonObj = JSON.parse(json);
    return jsonObj;
  }

  /*将json字符串转成json对象
   * 注意！转化成是一个json对象数组,这里取第一个
   * */
  toJsonObjs(json:any){
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
  changeObject(a:any){
    if(!(a instanceof Object) || (a instanceof  Array)){
      return  a;
    }
    let b = {};
    for(let attr in a){
      b[attr] = this.changeObject(a[attr]);
    }
    return b;
  }

  /*是否为大于0的数字*/
  isNumber(data:any){
    if(!(data >=0 || data <=0)  ){
      return false;
    }
    return true;
  }

  //校验是否有值
  inputValidation(param:any,menuParam:any,num?:string){
    if(num){
      if(!(this.isNumber(this.order[param]))){
        this.order[param] = "";
        return true;
      }
    }
    if(param) {
      let value = this.order[param];
      if(!value){
        let isExit = false;
        for(let att of this.msgs){
          if(att.summary == (menuParam[param]+"_error")){
            isExit = true;
          }
        }
        if(!isExit){
          let message= {severity:'warn', summary:menuParam[param]+"_error", detail:"'"+menuParam[param]+"'不能为空"};
          this.msgs.push(message);
          this.msgs = this.wzlAlert.multiple(this.msgs);
        }
      }else{
        for(let i = 0; i < this.msgs.length; i++){
          let att = this.msgs[i];
          if(att.summary == (menuParam[param]+"_error")){
            this.msgs.splice(i,i+1);
            i--;
          }
        }
      }
      if(this.msgs.length ==0){
        this.wzlAlert.clear();
        return false;
      }else{
        return true;
      }
    }else{
      console.log("校验"+menuParam[param]+"的值时，param为空");
    }
  }

  /**
   * 文本框验证
   * @param value 输入框的值
   * @param valueName 值的中文名
   * @param type 值的类型，默认不传是string，date：时间，number：数字
   */
  inputVerify(value:any,valueName:string,type?:string){
    if(type){
      type = "string";
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

  /*初始化require*/
/*  requireInstance(){
    var System: any;
    System.import('/assets/js/regular-expresions.js').then(file => {
      file.test();
    });
  }*/

  /*将循环依赖的json对象数组，转换成json字符串*/
  toJsonByRequest(arr:any[]){
  }


}
