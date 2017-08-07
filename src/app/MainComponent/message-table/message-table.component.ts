import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Service/data.service'
import {ValueService} from '../../Service/value.service'
import {CommonService} from '../../common.service'
declare var $:any;
@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})

export class MessageTableComponent implements OnInit {
    constructor(
        private dataService:DataService,
        private valueService:ValueService,
        private commonService:CommonService
    ) { }

    seeks=false;
    queryParameter={
        sendTime:"",
        messageChanel:"",
        modelCode:"",
        phoneNumber:""
    }
    skip=0;
    count=10;
    total=0;
    messageChanelList=this.valueService.messageChannelList;
    templateList=[];

    ngOnInit() {
        $('#message_table').bootstrapTable(this.table);
        this.loadData(this.queryParameter,0,10);
        this.dataService.getTemplateList().subscribe(res=>{
            this.templateList=res;
        })

    }

    loadData(queryParameter,skip,count){
        this.seeks=true;
        this.dataService.getMessageList(this.commonService.transformTime(queryParameter.sendTime),queryParameter.messageChanel,queryParameter.modelCode,queryParameter.phoneNumber,skip,count).subscribe(res=>{
            var list=res.data;
            $('#message_table').bootstrapTable('load',list)
            this.seeks=false;
            this.total=res.total;
        },rej=>{
            this.seeks=false;
        })

    }
    query(){
        this.skip=0;
        this.loadData(this.queryParameter,this.skip,this.count);
    }
    pchanged(emInfo){
       
        this.skip=emInfo.pageIndex;
        this.count=emInfo.pageSize;
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
            {field: "sendTime",title: "发送时间", order: "desc"},
            {field: "mobile",title: "接收号码",titleTooltip: ""},
            {field: "content",title: "短信内容"},
            {field: "sendType",title: "发送通道"},
            {field: "feedBackCode",title: "通道反馈码"},
            {field: "templateId",title: "模板编号"},
            {field: "error",title: "接口异常",sortable: true},
         
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
        this.dataService.exportMessageList(this.commonService.transformTime(this.queryParameter.sendTime),this.queryParameter.messageChanel,this.queryParameter.modelCode,this.queryParameter.phoneNumber,0,this.total)
    }

}
