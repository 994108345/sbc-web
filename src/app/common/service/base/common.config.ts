/*全局的参数*/
//后台服务基地址
import {HttpHeaders} from '@angular/common/http';
import {Message} from 'primeng/api';

export const  BizRoot = "/sbc-permission";
//前台项目名
export const  BaseRoot = "/app";

/**
 *后台服务地址
 * */
export class CommonServiceUrls {
    addUrl?: string; // 新增url
    editUrl?: string; // 修改url
    deleteUrl?: string; // 删除url
    queryUrl?: string; // 查询url
    detailUrl?: string; // 查看明细url
    retryUrl?: string; // 重传url
    downUrl?: string;      // 下载url
}

// 页面内路由地址管理
export class CommonRouters {
  constructor(public bizModule: string) {
    let baseUrl = "/" +BaseRoot  + "/" + bizModule;
    this.path = bizModule;
    this.rootRouter = baseUrl;
    this.addRouter = baseUrl + "/add";
    this.editRouter = baseUrl + "/edit";
    this.detailRouter = baseUrl + "/detail";
  }

  path:string;
  rootRouter: string; // 主页面
  addRouter?: string; // 新增页面
  editRouter?: string; // 修改页面
  detailRouter?: string; // 明细页面
}



/*请求参数*/
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

/*成功状态*/
export  const successStatus = 10000;

/*获取当前屏幕的大小*/
/*宽度*/
//export  const  screnWidth = document.documentElement.clientWidth;
/*高度*/
//export  const  screnHeight = document.documentElement.clientHeight;
