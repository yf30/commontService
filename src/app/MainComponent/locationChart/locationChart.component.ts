import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../common.service';
import { DataService } from './../../Service/data.service';

@Component({
  selector: 'app-locationChart',
  templateUrl: './locationChart.component.html',
  styleUrls: ['./locationChart.component.css']
})
export class LocationChartComponent implements OnInit {
  options:any
  dateTime:string = "hour";
  startTime:any;
  endTime:any;
  seeks:boolean;
  constructor(private DataService:DataService,private commService:CommonService) {
  }

  ngOnInit() {
    this.startTime = this.commService.transformBeforeHour();
    this.endTime = this.commService.transformTime(new Date);
    this.getChart(this.startTime,this.endTime);
  }

  query(){
    if(!this.endTime){ this.endTime = this.commService.transformTime(new Date)};
    this.getChart(this.startTime,this.endTime);
  }

  getChart(startTime,endTime){
    this.seeks = true;
    this.DataService.getPointList(startTime,endTime,2).subscribe(res=>{
        this.options = this.createChartOptions([{
            name:'总定位次数',
            data:res.data[0].points,
            color: "#BF0B23"
        },{
            name:'LBS定位次数',
            data:res.data[1].points,
        },{
            name:'北斗定位次数',
            data:res.data[2].points,
        }]);
        this.seeks = false;
    },rej=>{this.seeks = false;});
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
                title: {
                    align: 'high',
                    offset: 10,
                    text: '时间',
                    rotation: 0,
                    x: 0
                },
                minRange: 30*5,
          },
          yAxis:{
            lineWidth:"1",
            title: { 
                align: 'high',
                offset: 0,
                text: '次数',
                rotation: 0,
                y: -30
              }
          },
          tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M',
          },
          title: { text : '定位折线图'},
          series: data
      };
  }


}