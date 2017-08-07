import { Response } from '@angular/http';
import { Headers, } from '@angular/http';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import { Interceptor, InterceptedRequest, InterceptedResponse } from '../vendor/angular2-interceptors-master/index.js';

declare var $:any;
declare var bootbox;

@Injectable()
export class configInterceptor implements Interceptor {
    constructor(private Router:Router){}

    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        if(request.options.url.indexOf('User/login') == -1){
            let loginData = JSON.parse(window.sessionStorage.getItem("loginData"));
            if(loginData){ request.options.headers.append('Authorization',"Bearer "+ loginData.jwtToken)}
        }
        return request;
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        let Response = response.response.json();

        //判断是否登录
        if( !Response.success && Response.errorCode == "10006"){
            this.Router.navigate(["/login"]);
            bootbox.alert(Response.errorMessage);
            throw response;
        }else if( !Response.success && Response.errorCode != "10006"){
            bootbox.alert(Response.errorMessage)
            throw response;
        }
        //标准化
        response.response["_body"] = response.response.json().data;

        //时间转换
        if( response.response.url.indexOf("Chart/GetPointList") > 0){
            var points = response.response.json().data;
            points.forEach(item => {
                item.points.forEach((ele,index) => {
                    ele[0] = this.utcDateTime(ele[0]);
                    ele[1] = Number(ele[1])
                });    
            });  
            
            //柱状图计算总数
            if(response.response.url.indexOf("&type=1") > 0 || response.response.url.indexOf("&type=2") > 0){
                points.forEach(item => {
                var total = 0;
                item.points.forEach((ele,index) => {
                    total += ele[1];
                }); 
                item.total = total;
            });
            }  
        }

        return response;
    }

    //转换时间
    utcDateTime(date){
        var ua = navigator.userAgent.toLowerCase(), check = function (r) { return r.test(ua); }, isOpera, isSafari;
        var browser = {
            chrome: check(/\bchrome\b/),
            opera: (isOpera = check(/opera/)),
            safari: (isSafari = check(/webkit/)),
            gecko: !isSafari && check(/gecko/),
            msie: !isOpera && check(/msie/)
        };
        var time = new Date(date);
        if (time.getTime() === 0) { return null; }
        var now = new Date();
        if (browser.chrome || browser.safari) {
            var offset = -now.getTimezoneOffset(); // unit of minute
            time = new Date(time.getTime() + (offset * 60 * 1000));
        }
        return time.getTime();
     }
}
