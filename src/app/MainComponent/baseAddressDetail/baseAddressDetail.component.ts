import { DataService } from './../../Service/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
declare var BMap:any;
declare var bootbox;
@Component({
  selector: 'app-baseAddressDetail',
  templateUrl: './baseAddressDetail.component.html',
  styleUrls: ['./baseAddressDetail.component.css']
})
export class BaseAddressDetailComponent implements OnInit {
  map:any;
  id:any;
  bestAddress={
    time:"",
    count:"",
    lastModificationTime:"",
    address:"",
    longitude:"",
    latitude:""
  };
  constructor(private DataService:DataService,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
        this.id = params['id'];
    });

    this.DataService.getPositionDetail(this.id).subscribe(res=>{
      this.bestAddress = res;
    });  

    this.map = new BMap.Map("baiduMap"); 
    // var x = 116.32715863448607;
    // var y = 39.990912172420714;
    var ggPoint = new BMap.Point(this.bestAddress.longitude,this.bestAddress.latitude);
    this.map.centerAndZoom(ggPoint, 15);
  	this.map.enableScrollWheelZoom(true);
  	this.map.disableDragging();     //禁止拖拽
  	setTimeout(()=>{
      this.map.enableDragging();   //两秒后开启拖拽
  	  this.map.enableInertialDragging();   //两秒后开启惯性拖拽
  	}, 2000);


  
  }

  

  save(){
    var x = 119.45583541;
    var y = 32.20440944;
    this.map.clearOverlays(); 
    var new_point = new
    BMap.Point(x,y);
    var marker = new BMap.Marker(new_point);  // 创建标注
    this.map.addOverlay(marker);              // 将标注添加到地图中
    this.map.panTo(new_point);      
  }

}