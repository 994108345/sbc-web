

import {Injectable} from "@angular/core";
@Injectable()
export class WzlCacheService{

  constructor( ){
  }

  /*获取缓存*/
  getCache(key:string){
    let strr = localStorage.getItem(key);
    return this.tOJsonObjs(strr);
  }

  /*设置缓存*/
  setCache(key:string,object:any){
    if(typeof(object)== "number"  || typeof(object)== "string" ){
      localStorage.setItem(key,object.toString())
    }else{
      let str = this.toJsonStr(object);
      localStorage.setItem(key,str)
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
  tOJsonObjs(json:any){
    let jsonObj = JSON.parse(json);
    return jsonObj;
  }

  /*将json字符串转成json对象
   * 注意！转化成是一个json对象数组,这里取第一个
   * */
  tOJsonObj(json:any){
    let jsonObj = JSON.parse(json);
    return jsonObj[0];
  }

}

