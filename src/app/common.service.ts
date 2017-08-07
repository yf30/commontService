import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

constructor() { }
    /**
     * 转换时间
     */
    transformTime(time: any, type?: any): void {
        if(time==""||time==null||time=="0001-01-01 00:00:00"){return null};
        var type = type || "yyyy.MM.dd HH:mm:ss"
        var t = new Date(time);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        var ty=function(i){
            var tempStr;
            if(i<10){tempStr='000'+i}
            else if(i<100){tempStr='00'+i;}
            else if(i<1000){tempStr='0'+i}
            else{tempStr=i};
            return tempStr;
        }
        return type.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return ty(t.getFullYear());
                case 'MM':
                    return tf(t.getMonth() + 1);
                case 'mm':
                    return tf(t.getMinutes());
                case 'dd':
                    return tf(t.getDate());
                case 'HH':
                    return tf(t.getHours());
                case 'ss':
                    return tf(t.getSeconds());
            }
        });
    }
    //前1小时
    transformBeforeHour(){
        var time  = new Date();
        return this.transformTime(new Date(time.getFullYear(), time.getMonth(), time.getDate(),time.getHours()-1,time.getMinutes()));
    }
    //前一天
    transformBeforeDay(){
        var time  = new Date();
        return this.transformTime(new Date(time.getFullYear(), time.getMonth(), time.getDate()-1,time.getHours(),time.getMinutes()));
    }
    //前一个月
    transformBeforeMonth(){
        var time  = new Date();
        return this.transformTime(new Date(time.getFullYear(), time.getMonth()-1, time.getDate(),time.getHours(),time.getMinutes()));
    }

    //当天0点
    transformlastSameday(){
        var time  = new Date();
        return this.transformTime(new Date(time.getFullYear(), time.getMonth(), time.getDate(),0,0));
    }
    //当天12点
    transformfistSameday(){
        var time  = new Date();
        return this.transformTime(new Date(time.getFullYear(), time.getMonth(), time.getDate(),24,0));
    }
    
    //当前半小时
    transformHalfhour(){
        var now = new Date();
        var time = now.getTime() - 1000*60*30;
        var newtime = new Date(time)
        return this.transformTime(new Date(newtime.getFullYear(), newtime.getMonth(), newtime.getDate(),newtime.getHours(),newtime.getMinutes()));
    }


    
}