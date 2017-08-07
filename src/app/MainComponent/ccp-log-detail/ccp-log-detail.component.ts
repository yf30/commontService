import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ccp-log-detail',
  templateUrl: './ccp-log-detail.component.html',
  styleUrls: ['./ccp-log-detail.component.css']
})
export class CcpLogDetailComponent implements OnInit {

  constructor(private Router:Router) { }

  seeks=false;
  //详情
  phone:"";
  carCode:"";
  name:"";
  queryParameter={
      stratTimes:"",
      endTimes:"" 
  };

  ngOnInit() {
    this.loadData(this.queryParameter,0,10);
  }

  loadData(queryParameter,skip,count){
        this.seeks=true;
        // this.dataService.getGeoPointList(this.commonService.transformTime(queryParameter.startTime),this.commonService.transformTime(queryParameter.endTime),queryParameter.address,skip,count).subscribe(res=>{
        //     var list=res.data;
        //     $('#ccpLogRecord_table').bootstrapTable('load',list)
        //     this.seeks=false;
        //     this.total=res.total;
        // },rej=>{
        //     this.seeks=false;
        // })
    }

    query(){      
        this.loadData(this.queryParameter,0,10);
    }

    backUrl(){
      this.Router.navigateByUrl(`ccpLogRecord/table`);
    }


}
