import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Service/data.service';
import {ValueService} from '../../Service/value.service'
declare var $:any;
@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent implements OnInit {
    constructor(
        private dataService:DataService,
        private valueService:ValueService
    ) { }
    seeks=false;
    queryParameter={
        phone:"",
        locationType:"",
        carCode:"",
        tag:""
    }
    total=0;
    locationTypeList=this.valueService.locationTypeList;

    

    ngOnInit() {
        
        $('#location_table').bootstrapTable(this.table);
        this.loadData(this.queryParameter,0,10);
    }

    loadData(queryParameter,skip,count){
        this.seeks=true;
        this.dataService.getLocationList(queryParameter.phone,queryParameter.locationType,queryParameter.carCode,queryParameter.tag,skip,count).subscribe(res=>{
            var list=res.data;
            $('#location_table').bootstrapTable('load',list);;
            this.seeks=false;
            this.total=res.total;
        })
    }

    query(){
        this.loadData(this.queryParameter,0,10);
    }
    pchanged(emInfo){
       
        
        this.loadData(this.queryParameter,emInfo.pageIndex,emInfo.pageSize)
        this.table.pageSize=emInfo.pageSize;
    
    }

    table={
        
            // url: "index.php",//数据源
            dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            // height: tableHeight(),
            clickToSelect:true,
            singleSelect:false,
            pagination: false,//是否分页
            customSort:(name,order) =>{},
            pageSize: 10,//单页记录数
            pageList: [10, 20, 50],//分页步进值
            sidePagination: "client",//服务端分页
            buttonsAlign: "left",//按钮对齐方式 子询价编号 发货地址 送货地址 货物名称 货物数量 所需车长 询价时间 紧急程度 询价状态
            columns: [
                // {field: "state",checkbox: true},
                // {field: "index",title: "序号",align: "center",valign: "middle",},
                {field: "time",title: "定位时间", order: "desc"},
                {field: "carCode",title: "车牌号",titleTooltip: ""},
                {field: "phoneNumber",title: "手机号"},
                {field: "latitude",title: "经度"},
                {field: "longitude",title: "纬度"},
                {field: "tag",title: "标记"},
                {field: "positionType",title: "定位方式",sortable: true},
            
            ],
            cellStyle:( row, index)=>{
            return {classes:'table_cell'}
            },
            data: [],
            
            
            actionFormatter:function(value, row, index){
                // console.info('tyv')
            },
            locale: "zh-CN"//中文支持,
            
        
    }

    export(){
        this.dataService.exportLocationList(this.queryParameter.phone,this.queryParameter.locationType,this.queryParameter.carCode,this.queryParameter.tag,0,this.total)
    }


}
