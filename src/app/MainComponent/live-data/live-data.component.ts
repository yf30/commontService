import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Service/data.service';
import {  Router } from '@angular/router';
import {ValueService} from '../../Service/value.service';
import {CommonService} from '../../common.service'
declare var $:any;

@Component({
    selector: 'app-live-data',
    templateUrl: './live-data.component.html',
    styleUrls: ['./live-data.component.css']
})
export class LiveDataComponent implements OnInit {
    seeks=false;
    queryParameter={
        startTime:"",
        endTime:"",
        content:"",
        userCode:"",
        MS:"",
        TT:""
    }
    total=0;
    messageTypeList=this.valueService.messageTypeList;

    constructor(
        private dataService:DataService,
        private router:Router,
        private valueService:ValueService,
        private commonService:CommonService
    ) { }

    ngOnInit() {
        $('#liveData_table').bootstrapTable(this.table);
        this.loadData(this.queryParameter,0,10);

    }
    loadData(queryParameter,skip,count){
        this.seeks=true;
        this.dataService.getLivaDataList(this.commonService.transformTime(queryParameter.startTime),this.commonService.transformTime(queryParameter.endTime),queryParameter.content,queryParameter.userCode,queryParameter.MS,queryParameter.TT,skip,count).subscribe(res=>{
            var list=res.data;
            $('#liveData_table').bootstrapTable('load',list)
            this.seeks=false;
            this.total=res.total;
        })
    }

    select(msg){
        this.queryParameter.MS=msg;
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
            {field: "creationTime",title: "发送时间", order: "desc"},
            {field: "userId",title: "用户编号",titleTooltip: ""},
            {field: "dataId",title: "数据编号"},
            {field: "content",title: "内容"},
            {field: "type",title: "消息类型"},
            {field: "messageStatus",title: "是否送达"},
            {
                field: 'template',
                title: '功能',
                formatter:  (value, row, index) =>{
                    
                    return `<a class="goDetail" " routerLinkActive="active" title='' >详情</a >`;
       
                },
                events:{
                    'click .goDetail':(e,value,row,index)=>{
                        this.router.navigateByUrl(`/app/liveData/detail/${row.dataId}`)
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

    query(){
        this.loadData(this.queryParameter,0,10);
    }

     pchanged(emInfo){
       
        
        this.loadData(this.queryParameter,emInfo.pageIndex,emInfo.pageSize)
        this.table.pageSize=emInfo.pageSize;
    
    }

   export(){
       this.dataService.exportLivaDataList(this.commonService.transformTime(this.queryParameter.startTime),this.commonService.transformTime(this.queryParameter.endTime),this.queryParameter.content,this.queryParameter.userCode,this.queryParameter.MS,this.queryParameter.TT,0,this.total)
   }
    
}
