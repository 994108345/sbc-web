/**
 * Created by wenzailong on 2017/12/20.
 */
/*公用接口服务*/
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {httpOptions} from './common.config';
@Injectable()
export class  CommonService {
  /*将httpclient注入到该类中*/
  constructor(private http: HttpClient) { }

     //发送请求POST
    doHttpPost(url: string, param: any, options?: any): Promise<any> {
      let defaultOptions = httpOptions;
      let option = options || defaultOptions;

      return this.http.post(url, param, option)
        .toPromise()
        .then(res => {
          return this.extractData(res)
        })
        .catch(
          res => { return this.handleError(res)
          });
    }

    //发送请求GET
    doHttpGet(url: string, options?: any): Promise<any> {
      options = options || {};
      return this.http.get(url, options)
        .toPromise()
        .then((res) => {
          //return this.extractData(res)
        })
        .catch((res) => {
          return this.handleError(res)
        });
    }

    //成功处理
    public extractData(res: any) {
      return res || {};
    }

    //异常处理
    public handleError(error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //const err = body.error || JSON.stringify(body);
        const err = "";
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Promise.reject(errMsg);
    }
}
