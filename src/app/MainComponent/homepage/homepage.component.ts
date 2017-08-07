import { Router } from '@angular/router';
import { CommonService } from './../../common.service';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ChartComponent } from 'angular2-highcharts'
import { DataService } from './../../Service/data.service';
import * as highcharts  from 'highcharts';
highcharts.dateFormat('%Y-%m-%d %H:%M:%S') 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit,OnDestroy{
  options
  columnOptions
  total:10;
  chart:any;
  SMSchart:any;
  MSGchart:any;
  locationChart:any;
  smsnum:number;
  msgnum:number;
  unmsgnum:number;
  addbasenum:number;
  editbasenum:number;
  LBSnum:number;
  bdsnum:number;
  cspnum:number;
  interval:any;

  constructor(private DataService:DataService,private comService:CommonService,private Router:Router) {
      
       
   }

  ngOnInit() {
    let loginData = window.sessionStorage.getItem("loginData");
    if(!loginData || loginData=='null'){
        // this.Router.navigateByUrl('login');
        return;
    };
    this.getchart();
    this.interval = setInterval(()=>{
        this.getchart();
    },(1000*60)*5)
  }
  

  ngOnDestroy(){
    if(this.interval){
        clearInterval(this.interval)
    }
  }
 
  getchart(){

       this.DataService.getPointList(this.comService.transformHalfhour(),this.comService.transformTime(new Date()),4).subscribe(res=>{
            this.SMSchart = this.createChartOptions([{
                name:'总短信数',
                data:res.data[0].points,
                color: "#BF0B23"
            }],"短信服务(当天)");
       });
    
    
      this.DataService.getPointList(this.comService.transformHalfhour(),this.comService.transformTime(new Date()),3).subscribe(res=>{
            this.MSGchart = this.createChartOptions([{
                name:'消息数',
                data:res.data[0].points,
                color: "#BF0B23"
            }],"消息服务(当天)");
       });
    
       this.DataService.getPointList(this.comService.transformHalfhour(),this.comService.transformTime(new Date()),2).subscribe(res=>{
            this.LBSnum = res.data[1].total;
            this.bdsnum = res.data[2].total;
            this.cspnum = res.data[3].total;
            this.locationChart = this.createChartOptions([{
                name:'定位数',
                data:res.data[0].points,
                color: "#BF0B23"
            }],"定位服务(当天)");
       });
    
       this.DataService.getPointList(this.comService.transformHalfhour(),this.comService.transformTime(new Date()),1).subscribe(res=>{
            this.addbasenum = res.data[0].total;
            this.editbasenum = res.data[1].total;
            this.columnOptions = this.createhistogramOptions([{
                    name: '新增',
                    y: res.data[0].total,
                }, {
                    name: '修正',
                    y: res.data[1].total,
                }]);
       });
    
       //短信发送总数
       this.DataService.getMessageList(this.comService.transformHalfhour(),"","","",0,-1).subscribe(res=>{
           this.smsnum = res.total;
       });
    
       //消息发送总数：
       this.DataService.getLivaDataList(this.comService.transformHalfhour(),this.comService.transformTime(new Date()),"","",1,"",0,-1).subscribe(res=>{
           this.msgnum = res.total;
       });
    
       //消息未送达总数
       this.DataService.getLivaDataList(this.comService.transformHalfhour(),this.comService.transformTime(new Date()),"","",2,"",0,-1).subscribe(res=>{
           this.unmsgnum = res.total;
       });

  }


    //创建line chart
    createChartOptions(data,title){
        return {
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%Y-%m-%d %H:%M}',
                },
                minRange: 30*5, // fourteen days
                title: {
                    align: 'high',
                    offset: 10,
                    text: '时间',
                    rotation: 0,
                    x: 5
                },
            },
            yAxis:{
            lineWidth:"1",
            title: { 
                align: 'high',
                offset: 20,
                text: '次数',
                rotation: 0,
                y: 12
                }
            },
            tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M',
            },
            title: { text : title,
            y: 4,
        },
            series: data
        };
    }


    createhistogramOptions(data) {
        return {
            chart: {
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50
                }
            },
            title:{text:'基址服务（当天）',y:16},
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            xAxis: {
            categories: [
                '新增',
                '修正',
                ]
            },
            series: [{
                name: '基址',
                colorByPoint: true,
                data: data
            }],
        };
    }
  


}