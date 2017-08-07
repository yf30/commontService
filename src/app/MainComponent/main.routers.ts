import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomepageComponent } from './homepage/homepage.component'



import {MessageTableComponent} from './message-table/message-table.component';
import {LiveDataComponent} from './live-data/live-data.component';
import {LocationTableComponent} from './location-table/location-table.component';
import { LiveDataDetailComponent } from './live-data-detail/live-data-detail.component';
import { SMSchartComponent } from './SMSchart/SMSchart.component';
import { MessageChartComponent } from './messageChart/messageChart.component';
import { LocationChartComponent } from './locationChart/locationChart.component';
import {PositionTableComponent} from './position-table/position-table.component'
import {SignupTableComponent} from './signup-table/signup-table.component'
import { BaseAddressDetailComponent } from './baseAddressDetail/baseAddressDetail.component';
//历史记录
import { CcpLogRecordComponent } from './ccp-log-record/ccp-log-record.component';
import { CcpLogDetailComponent } from './ccp-log-detail/ccp-log-detail.component';


export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [

      {path: '', redirectTo: 'homepage', pathMatch: 'full'},
      {path:'homepage',component: HomepageComponent},
      {path:'message/table',component:MessageTableComponent},
      {path:'message/SMSChart',component:SMSchartComponent},
      {path:'liveData/msgChart',component:MessageChartComponent},
      {path:'liveData/table',component:LiveDataComponent},
      {path:'location/table',component:LocationTableComponent},
      {path:'location/locationChart',component:LocationChartComponent},
      {path:'signup/table',component:SignupTableComponent},
      {path:'position/table',component:PositionTableComponent},
      {path:'baseaddress/baseaddressDetail/:id',component:BaseAddressDetailComponent},
      //历史记录
      { path:'ccpLogRecord/table',component:CcpLogRecordComponent},
      { path:'ccpLogRecord/ccpLogDetail/:id',component:CcpLogDetailComponent}

    ]
  }
];


