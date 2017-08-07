import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {mainRoutes} from './main.routers';
import {MainComponent} from './main.component';

//头部
import {HeaderComponent} from './header/header.component';
import {NavLeftComponent} from './nav-left/nav-left.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require:any;
import * as highcharts  from 'highcharts';
highcharts.setOptions({
    lang:{
       contextButtonTitle:"图表导出菜单",
       decimalPoint:".",
       downloadJPEG:"下载JPEG图片",
       downloadPDF:"下载PDF文件",
       downloadPNG:"下载PNG文件",
       downloadSVG:"下载SVG文件",
       drillUpText:"返回 {series.name}",
       loading:"加载中",
       months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       noData:"没有数据",
       numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
       printChart:"打印图表",
       resetZoom:"恢复缩放",
       resetZoomTitle:"恢复图表",
       shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
       thousandsSep:",",
       weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
    },
    // global: {
    //     timezoneOffset: -8 * 60  // +8 时区修正方法
    // }
}); 
export function highchartsFactory() {
  return require('highcharts');
}

//短信
import {MessageTableComponent} from './message-table/message-table.component'

import { RebirthNGModule } from 'rebirth-ng';
import { RebirthNGConfig, REBIRTH_NG_I18N_ZHCN } from 'rebirth-ng';

import { LiveDataComponent } from './live-data/live-data.component';
import { LocationTableComponent } from './location-table/location-table.component';
import {PaginationComponent} from '../commomComponent/pagination/pagination.component';
import { LiveDataDetailComponent } from './live-data-detail/live-data-detail.component';
import { SMSchartComponent } from './SMSchart/SMSchart.component';
import { MessageChartComponent } from './messageChart/messageChart.component';
import { LocationChartComponent } from './locationChart/locationChart.component';
import { SignupTableComponent } from './signup-table/signup-table.component';
import { PositionTableComponent } from './position-table/position-table.component';
import { BaseAddressDetailComponent } from './baseAddressDetail/baseAddressDetail.component';
import { CcpLogRecordComponent } from './ccp-log-record/ccp-log-record.component';
import { CcpLogDetailComponent } from './ccp-log-detail/ccp-log-detail.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(mainRoutes),
    ChartModule,
    RebirthNGModule.forRoot()
  ],
  declarations: [
      MainComponent,
      HeaderComponent,
      NavLeftComponent,
      HomepageComponent,
      MessageTableComponent,
      LiveDataComponent,
      LocationTableComponent,
      PaginationComponent,
      LiveDataDetailComponent,
      SMSchartComponent,
      MessageChartComponent,
      LocationChartComponent,
      SignupTableComponent,
      PositionTableComponent,
      BaseAddressDetailComponent,
      CcpLogRecordComponent,
      CcpLogDetailComponent
],

  exports: [],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
  ]
})
export class MainModule { 
    constructor(private RebirthNGConfig:RebirthNGConfig) { 
      this.RebirthNGConfig.datePicker = REBIRTH_NG_I18N_ZHCN.datePicker;
    }
}
