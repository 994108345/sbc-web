import {CommonRouters, PermissionRoot} from './common/service/base/common.config';

export const RedisdRoot = "/sbc-redis";

/*请求后端路径*/
export const urls = {
  /*---------------登陆---------------*/
  /*登陆请求接口*/
  loginUrl:PermissionRoot + "/Login/login",
  /*验证账号是否存在*/
  validUserNameUrl:PermissionRoot + "/Reset/validUserName",
  /*注销*/
  loginOutUrl:PermissionRoot + "/Login/loginOut",

  /*---------------重置密码---------------*/
  /*查询问题集合*/
  queryQuestionsUrl:PermissionRoot + "/Reset/queryQuestions",
  /*验证问题集合答案对不对*/
  validQuestionUrl:PermissionRoot + "/Reset/validQuestion",
  /*重置密码*/
  modifyPasswordUrl:PermissionRoot + "/Reset/modifyPassword",

  /*网站访问数+1*/
  accessCountUrl:PermissionRoot + "/Website/addAccessCount",

  /*-------------------redis-------------------*/
  /*秒杀*/
  seckillUrl:RedisdRoot + "/SecKill/beginKill",
};

let permissionWeb:string = '';

/*跳转菜单页面路径*/
export const routers = {
  menusRouter: 'menus',
  loginRouter: 'login',
  modifyPasswordRouter:'login/password',
};

export const cacheKey = {
  userInfo:'userInfo',
}
