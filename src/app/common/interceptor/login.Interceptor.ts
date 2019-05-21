import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';

@Injectable()
export class LoginInterceptor  implements HttpInterceptor{

  constructor(private router: Router){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("拦截器进来了吗-1");
    console.log(req);
    return next.handle(req).pipe(
      //处理返回值对象
      tap(event => {
        if (event instanceof HttpResponse) {
          this.handleData(event);
        }
      }),
      catchError((err: HttpErrorResponse) => this.handleDataError(err))
    ) ;
  }

  /**
   * 处理未登录状态的跳转
   * @param event
   */
  private handleData(
    event: HttpResponse<any>
  ): Observable<any> {
    console.log("拦截器进来了吗-2");
    console.log(event);
    // 业务处理：一些通用操作
    switch (event.body.status) {
      case 20000://未登录
        console.log('not login') ;
        this.router.navigate(['/login']);
        break ;
      default:
        console.log("什么都没有匹配到");
        return of(event) ;
    }
  }

  /**
   * 异常处理
   * @param event
   */
  private handleDataError(
    event: HttpErrorResponse,
  ): Observable<any> {
    return of(event) ;
  }

}
