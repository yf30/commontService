import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Service/data.service';
import {ValueService} from  '../../Service/value.service';
declare var $:any;
@Component({
  selector: 'app-signup-table',
  templateUrl: './signup-table.component.html',
  styleUrls: ['./signup-table.component.css']
})
export class SignupTableComponent implements OnInit {
    constructor(
        private dataService:DataService,
        private valueService:ValueService
    ) { }
    seeks=false;
    queryParameter={
        phone:"",
        
        carCode:"",
        BDLocationState:"",
        BaseStationLocationState:""
    }
    total=0;
    locationTypeList=this.valueService.locationTypeList;
    registerStateList=this.valueService.registerStateList
    

    ngOnInit() {
        
        $('#location_table').bootstrapTable(this.table);
        this.loadData(this.queryParameter,0,10);
    }

    loadData(queryParameter,skip,count){
        this.seeks=true;
        this.dataService.getStateList(queryParameter.phone,queryParameter.carCode,queryParameter.BDLocationState,queryParameter.BaseStationLocationState,skip,count).subscribe(res=>{
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
                {field: "creationTime",title: "创建时间", order: "desc"},
                {field: "carCode",title: "车牌号",titleTooltip: ""},
                {field: "phoneNumber",title: "手机号"},
                {field: "beiDouRegisterState",title: "北斗定位状态"},
                {field: "baseRegisterState",title: "基站定位状态"},
                {field: "lastModificationTime",title: "最后更新时间"},
                {
                field: 'template',
                title: '功能',
                formatter:  (value, row, index) =>{
                    
                    return `<a class="refresh" " routerLinkActive="active" title='' >刷新</a >`;
       
                },
                events:{
                    'click .refresh':(e,value,row,index)=>{
                        window.location.reload();
                        // window.location.href="app/signup/table";
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
        this.dataService.exportStateList(this.queryParameter.phone,this.queryParameter.carCode,this.queryParameter.BDLocationState,this.queryParameter.BaseStationLocationState,0,this.total)
    }

}
