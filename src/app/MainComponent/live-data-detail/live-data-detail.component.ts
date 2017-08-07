import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {DataService} from '../../Service/data.service';
@Component({
  selector: 'app-live-data-detail',
  templateUrl: './live-data-detail.component.html',
  styleUrls: ['./live-data-detail.component.css']
})
export class LiveDataDetailComponent implements OnInit {

  constructor(
      private route:ActivatedRoute,
      private dataService:DataService
  ) { }
  id="";
  time="gtfvhbyf";
  userId="";
  dataId="";
  messageType="";
  hasSended="";
  content="";
  


  ngOnInit() {
      this.route.params.subscribe(params=>{
          this.id=params['id'];
          this.dataService.getLivaDataDetail(this.id).subscribe(res=>{
              this.time=res.data.creationTime;
              this.userId=res.data.userId;
              this.dataId=res.data.dataId;
              this.messageType=res.data.type;
              this.hasSended=res.data.messageStatus;
              this.content=res.data.content;
          })
      })
  }

}
