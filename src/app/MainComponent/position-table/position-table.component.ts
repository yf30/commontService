import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Service/data.service'
import {ValueService} from '../../Service/value.service'
import {CommonService} from '../../common.service'
declare var $:any;
@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.css']
})
export class PositionTableComponent implements OnInit {

  constructor(
        private dataService:DataService,
        private valueService:ValueService,
        private commonService:CommonService,
        private Router:Router
    ) { }

    seeks=false;
    queryParameter={
        startTime:"",
        endTime:"",
        address:"",
        
    }
    total=0;
    messageChanelList=this.valueService.messageChannelList;
    

    ngOnInit() {
        $('#position_table').bootstrapTable(this.table);
        this.loadData(this.queryParameter,0,10);
    
    }

    loadData(queryParameter,skip,count){
        this.seeks=true;
        this.dataService.getGeoPointList(this.commonService.transformTime(queryParameter.startTime),this.commonService.transformTime(queryParameter.endTime),queryParameter.address,skip,count).subscribe(res=>{
            var list=res.data;
            $('#position_table').bootstrapTable('load',list)
            this.seeks=false;
            this.total=res.total;
        },rej=>{
            this.seeks=false;
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
            {field: "time",title: "创建时间", order: "desc"},
            {field: "address",title: "地址",titleTooltip: ""},
            {field: "longitude",title: "经度"},
            {field: "latitude",title: "纬度"},
            {field: "count",title: "使用次数"},
            {field: "lastModificationTime",title: "上次使用时间"},
             {
                field: 'template',
                title: '操作',
                formatter:  (value, row, index) =>{
                    return `<a class="goDetail" " routerLinkActive="active" title='' >编辑</a >`;
                },
                events:{
                    'click .goDetail':(e,value,row,index)=>{
                        this.Router.navigateByUrl(`baseaddress/baseaddressDetail/${row.id}`)
                    }
                }

            }
           
         
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
        this.dataService.exportGeoPointList(this.commonService.transformTime(this.queryParameter.startTime),this.commonService.transformTime(this.queryParameter.endTime),this.queryParameter.address,0,this.total)
    }

  

}
