import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {AppRoutesModule} from './app.routers';

import {LoginComponent} from './LoginComponent/login.component';
import {MainModule} from './MainComponent/main.module';
import { CommonService } from './common.service';


import {InterceptorService} from '../vendor/angular2-interceptors-master/index.js';

import { configInterceptor } from './config.Interceptor';
import { XHRBackend, RequestOptions } from '@angular/http';
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, configInterceptor:configInterceptor){
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(configInterceptor);
  return service;
}



//service
import {RouteService} from './Service/route.service'
import {DataService} from './Service/data.service';

import {ValueService} from './Service/value.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutesModule,
    MainModule
    
  ],
  providers: [
    RouteService,
    DataService,
    ValueService,
    configInterceptor,
    CommonService,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, configInterceptor]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
