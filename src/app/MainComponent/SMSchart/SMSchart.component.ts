import { CommonService } from './../../common.service';
import { DataService } from './../../Service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SMSchart',
  templateUrl: './SMSchart.component.html',
  styleUrls: ['./SMSchart.component.css']
})
export class SMSchartComponent implements OnInit {
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


  getChart(startTime,endTime){
    this.seeks = true;
    this.DataService.getPointList(startTime,endTime,4).subscribe(res=>{
        this.options = this.createChartOptions([{
            name:'总短信数',
            data:res.data[0].points,
            color: "#BF0B23"
        },{
            name:res.data[1].type,
            data:res.data[1].points,
        },{
            name:res.data[2].type,
            data:res.data[2].points,
        }]);
         this.seeks = false;
    },rej=>{this.seeks = false;});
     
  }

  //创建chart
  createChartOptions(data){
    return {
          xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%Y-%m-%d %H:%M}',
                },
                minRange: 30*5, // fourteen days
                // tickPositions: [Date.UTC(2017,5,3,14,10), Date.UTC(2017,5,3,14,15), Date.UTC(2017,5,3,14,20), Date.UTC(2017,5,3,14,25)]
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
                text: '次数',
                rotation: 0,
                y: -30
              }
          },
          tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M',
          },
          title: { text : '短信发送折线图'},
          series: data
      };
  }

}