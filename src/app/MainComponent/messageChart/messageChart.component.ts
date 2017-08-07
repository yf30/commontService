import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../common.service';
import { DataService } from './../../Service/data.service';
@Component({
  selector: 'app-messageChart',
  templateUrl: './messageChart.component.html',
  styleUrls: ['./messageChart.component.css']
})
export class MessageChartComponent implements OnInit {

  options:any
  dateTime:string = "hour";
  startTime:any;
  endTime:any;
  deliveryTotal:number;
  receiveTotal:number;
  undeliveredTotal:number;
  dayDelivery:number;
  dayUndelivery:number;
  seeks:boolean;

  constructor(private DataService:DataService,private commService:CommonService) {

  }

  ngOnInit() {
    this.startTime = this.commService.transformBeforeHour();
    this.endTime = this.commService.transformTime(new Date);
    this.getChart(this.startTime,this.endTime);
    
    //送达消息总数
    this.DataService.getLivaDataList("","","","",1,"",0,-1).subscribe(res=>{
      this.deliveryTotal = res.total;
    });

    //当天收到总数
    this.DataService.getLivaDataList(this.commService.transformlastSameday(),this.commService.transformfistSameday(),"","",3,"",0,-1).subscribe(res=>{
      this.receiveTotal = res.total;
    });

    //未送达总数
    this.DataService.getLivaDataList("","","","",2,"",0,-1).subscribe(res=>{
      this.undeliveredTotal = res.total;
    });

    //当天送达总数
    this.DataService.getLivaDataList(this.commService.transformlastSameday(),this.commService.transformfistSameday(),"","",1,"",0,-1).subscribe(res=>{
      this.dayDelivery = res.total;
    });
  
    //当天未送达总数
    this.DataService.getLivaDataList(this.commService.transformlastSameday(),this.commService.transformfistSameday(),"","",2,"",0,-1).subscribe(res=>{
      this.dayUndelivery = res.total;
    });


  }


  getChart(startTime,endTime){
    this.seeks=true;
    this.DataService.getPointList(startTime,endTime,3).subscribe(res=>{
        this.options = this.createChartOptions([{
            name:res.data[3].type,
            data:res.data[3].points,
            color: "#BF0B23"
        },{
            name:res.data[1].type,
            data:res.data[1].points,
        },{
            name:res.data[2].type,
            data:res.data[2].points,
        }]);
        this.seeks=false;
    },rej=>{this.seeks=false;});
  }

  query(){
    if(!this.endTime){ this.endTime = this.commService.transformTime(new Date)};
    this.getChart(this.startTime,this.endTime);
  }

  getTime(){
    var searchTime ;
    switch (this.dateTime) {
      case "hour":
         searchTime = this.commService.transformBeforeHour();
        break;
      case "day":
         searchTime = this.commService.transformBeforeDay();
        break;
       case "month": 
         searchTime = this.commService.transformBeforeMonth();
        break;
      default:null
        break;
    }
    this.startTime = searchTime;
  }


  createChartOptions(data){
    return {
          xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%Y-%m-%d %H:%M}',
                },
                tickPixelInterval: 30 * 5,
                minRange: 30*5,
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
                offset: 0,
                text: '条数',
                rotation: 0,
                y: -30
              }
          },
          tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M',
          },
          title: { text : '消息折线图'},
          series: data
      };
  }

}