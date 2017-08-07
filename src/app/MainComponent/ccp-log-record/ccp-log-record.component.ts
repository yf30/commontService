import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {DataService} from '../../Service/data.service'
import {ValueService} from '../../Service/value.service'
import {CommonService} from '../../common.service'

declare var $:any;

@Component({
  selector: 'app-ccp-log-record',
  templateUrl: './ccp-log-record.component.html',
  styleUrls: ['./ccp-log-record.component.css']
})
export class CcpLogRecordComponent implements OnInit {

  constructor( private dataService:DataService,private valueService:ValueService,private commonService:CommonService,private Router:Router) { }

  seeks=false;
  queryParameter={
      phone:"",
      carCode:"",
      name:"",
      stratTime:"",
      endTime:"" 
  };
  total=0;
  messageChanelList=this.valueService.messageChannelList;

    ngOnInit() {
        $('#ccpLogRecord_table').bootstrapTable(this.table);
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
            {field: "index",title: "序号",align: "center",valign: "middle",},
            {field: "phone",title: "手机号码",align: "center"},
            {field: "carCode",title: "车牌号",align: "center",titleTooltip: ""},
            {field: "name",title: "司机姓名",align: "center"},
            {field: "time",title: "认证通过时间",align: "center",order: "desc"},
            {field: "state",title: "禁用状态",align: "center"},
             {
                field: 'template',
                title: '查看日志',
                align: "center",
                formatter:  (value, row, index) =>{
                    return `<a class="glyphicon glyphicon-eye-open text-info goDetail" routerLinkActive="active" title='查看'></a >`;
                },
                events:{
                    'click .goDetail':(e,value,row,index)=>{
                        this.Router.navigateByUrl(`ccpLogRecord/ccpLogDetail/${row.id}`)
                    }
                }

            }
           
         
        ],
        cellStyle:( row, index)=>{
          return {classes:'table_cell'}
        },
        data: ["1"],
        actionFormatter:function(value, row, index){
            // console.info('tyv')
        },
        locale: "zh-CN"//中文支持,
    }

}
