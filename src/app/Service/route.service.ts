import { Injectable } from '@angular/core';

@Injectable()
export class RouteService {

  baseUrl="";

  constructor() {
      this.baseUrl="http://192.168.0.124:889/comm/"
  }
 

  SMS={
      GetMessageList:{
          url:'SMS/GetMessageList',
          method:'get'
      }
  }
    

}
