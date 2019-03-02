import {CommonRouters, PermissionRoot, ProdRoot} from './common/service/base/common.config';

export const RedisdRoot = "/sbc-redis";

/*请求后端路径*/
export const urls = {
  /*-----------------------------------基础路径-------------------------------*/
  // 新增url
  addUrl:"",
  // 修改url
  editUrl:"",
  // 删除url
  deleteUrl:"",
  // 查询url
  queryUrl:"",
  // 查看明细url
  detailUrl:"",
  // 重传url
  retryUrl:"",
  // 下载url
  downUrl:"",
  /*---------------登陆-------------------------------------------------------*/
  /*登陆请求接口*/
  loginUrl:PermissionRoot + "/Login/login",
  /*验证账号是否存在*/
  validUserNameUrl:PermissionRoot + "/Reset/validUserName",
  /*注销*/
  loginOutUrl:PermissionRoot + "/Login/loginOut",

  /*---------------重置密码-------------------------------------------------*/
  /*查询问题集合*/
  queryQuestionsUrl:PermissionRoot + "/Reset/queryQuestions",
  /*验证问题集合答案对不对*/
  validQuestionUrl:PermissionRoot + "/Reset/validQuestion",
  /*重置密码*/
  modifyPasswordUrl:PermissionRoot + "/Reset/modifyPassword",

  /*网站访问数+1*/
  accessCountUrl:PermissionRoot + "/Website/addAccessCount",

  /*-------------------redis--------------------------------------*/
  /*秒杀*/
  seckillUrl:RedisdRoot + "/SecKill/beginKill",
  resetUrl:RedisdRoot + "/SecKill/resetSeckill",

  /*---------------品牌-------------------------------------------*/
  //查询品牌信息
  queryBrandByPageUrl:ProdRoot + "/ProdBrandManage/query-brand-page",
  queryBrandByParamUrl:ProdRoot + "/ProdBrandManage/query-one-brand",
  addBrandUtl:ProdRoot + "/ProdBrandManage/insert-brand",
  updateBrandUtl:ProdRoot + "/ProdBrandManage/update-brand",
};

let permissionWeb:string = '';

/*跳转菜单页面路径*/
export const routers = {
  menusRouter: 'menus',
  loginRouter: 'login',
  modifyPasswordRouter:'login/password',
  indexRouter:'web/index',
  /*品牌*/
  brandAddRouter:'web/brand/add',
  brandEditRouter:'web/brand/edit',
  brandViewRouter:'web/brand/view',
  brandRouter:'web/brand',
  /*范例*/
  demoAddRouter:'web/demo/add',
};

export const cacheKey = {
  userInfo:'userInfo',
}
