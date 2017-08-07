import { Injectable } from '@angular/core';
import { Http,HttpModule } from '@angular/http';
import { InterceptorService  } from '../../vendor/angular2-interceptors-master/index.js';
import {RouteService} from './route.service';
@Injectable()
export class DataService {
  //baseUrl="http://192.168.0.124:889/comm/";
  baseUrl="/comm/";
  constructor(
    private http:InterceptorService,
    private RouteService:RouteService
  ) {}

 //PUT User/login?user=${userName}&password=${password}
 login(userName,password){
    return this.http.put(this.baseUrl+`User/login`,{
        userName:userName,
        password:password
    }).map(res=>res.json());
 }

  //获取短信列表
  getMessageList(sendTime,sendType,templateId,mobile,skip,count){
      return this.http.get(this.baseUrl+`SMS/GetMessageList?sendTime=${sendTime}&sendType=${sendType}&templateId=${templateId}&mobile=${mobile}&skip=${skip}&count=${count}`).map(res=>res.json());
  }
  //导出短信列表
  //GET /api/SMS/GetSMSExport
  exportMessageList(sendTime,sendType,templateId,mobile,skip,count){
      window.location.href=this.baseUrl+`SMS/GetSMSExport?sendTime=${sendTime}&sendType=${sendType}&templateId=${templateId}&mobile=${mobile}&skip=${skip}&count=${count}`
      
  }
  //获取模板列表
  //GET /api/SMS/GetTemplates
  getTemplateList(){
      return this.http.get(this.baseUrl+`SMS/GetTemplates`).map(res=>res.json());
  }


  //获取消息列表
  getLivaDataList(startTime,endTime,content,userid,MS,TT,skip,count){
      return this.http.get(this.baseUrl+`LiveData/GetLiveDataList?startTime=${startTime}&endTime=${endTime}&content=${content}&userid=${userid}&MS=${MS}&TT=${TT}&skip=${skip}&count=${count}`)
      .map(res=>res.json());
  }
  //导出消息列表
  //GET /api/LiveData/GetLiveDataExport
  exportLivaDataList(startTime,endTime,content,userid,MS,TT,skip,count){
      window.location.href= this.baseUrl+`LiveData/GetLiveDataExport?startTime=${startTime}&endTime=${endTime}&content=${content}&userid=${userid}&MS=${MS}&TT=${TT}&skip=${skip}&count=${count}`
      
  }

   //获取消息详情
  getLivaDataDetail(id){
    //   LiveData/GetLiveDataDetail/{DataId}
      return this.http.get(this.baseUrl+`LiveData/GetLiveDataDetail/${id}`)
      .map(res=>res.json());
  }
  

  //获取定位信息列表
  // GET /api/NavigationPosition/GetPositionList
  getLocationList(phoneNumber,postionType,carCode,tag,skip,count){
      return this.http.get(this.baseUrl+`NavigationPosition/GetPositionList?phoneNumber=${phoneNumber}&postionType=${postionType}&carCode=${carCode}&tag=${tag}&skip=${skip}&count=${count}`)
      .map(res=>res.json());
  }
  //获取定位信息列表
  //GET /api/NavigationPosition/GetPositionExport

   exportLocationList(phoneNumber,postionType,carCode,tag,skip,count){
      window.location.href= this.baseUrl+`NavigationPosition/GetPositionExport?phoneNumber=${phoneNumber}&postionType=${postionType}&carCode=${carCode}&tag=${tag}&skip=${skip}&count=${count}`
      
  }
  
  //获取注册信息列表
  getStateList(phoneNumber,carCode,beiDouRegisterState,baseRegisterState,skip,count){
      return this.http.get(this.baseUrl+`NavigationPosition/GetStateList?phoneNumber=${phoneNumber}&carCode=${carCode}&beiDouRegisterState=${beiDouRegisterState}&baseRegisterState=${baseRegisterState}&skip=${skip}&count=${count}`)
      .map(res=>res.json());
  }

  //GET /api/NavigationPosition/GetStateExport
  //导出注册信息列表
  exportStateList(phoneNumber,carCode,beiDouRegisterState,baseRegisterState,skip,count){
      window.location.href= this.baseUrl+`NavigationPosition/GetStateExport?phoneNumber=${phoneNumber}&carCode=${carCode}&beiDouRegisterState=${beiDouRegisterState}&baseRegisterState=${baseRegisterState}&skip=${skip}&count=${count}`
      
  }


  //GET /api/Chart/GetPointList
  getPointList(startTime,endTime,type){
      return this.http.get(this.baseUrl+`Chart/GetPointList?startTime=${startTime}&endTime=${endTime}&type=${type}`).map(res=>res.json());
  }
  
  //获取基址列表
  //   GET /api/Geocoding/GetPositionList
  getGeoPointList(startTime,endTime,address,skip,count){
      return this.http.get(this.baseUrl+`Geocoding/GetPositionList?startTime=${startTime}&endTime=${endTime}&address=${address}&skip=${skip}&count=${count}`).map(res=>res.json());
  }
  //导出基址列表
  //GET /api/Geocoding/GetPositionExport
  exportGeoPointList(startTime,endTime,address,skip,count){
      window.location.href= this.baseUrl+`Geocoding/GetPositionExport?startTime=${startTime}&endTime=${endTime}&address=${address}&skip=${skip}&count=${count}`
  }


  //GET /api/Geocoding/GetPositionDetail/{id}
  getPositionDetail(id){
      return this.http.get(this.baseUrl+`Geocoding/GetPositionDetail/${id}`).map(res=>res.json());
  }


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
