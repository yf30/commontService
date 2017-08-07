import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  constructor() { }
  //定位方式枚举下拉
  locationTypeList=[
      // {value:0,text:"全部"},
      {value:1,text:"基站定位"},
      {value:2,text:"北斗定位"},
      {value:3,text:"来货拉"}
  ]
  //短信通道枚举下拉
  messageChannelList=[
    // {value:0,text:"全部"},
    {value:1,text:"创蓝"},
    {value:2,text:"容联"}
  ]

  messageTypeList=[
    {num:1,value:'InquiryPricePayable',text:"询价应付报价"},
    {num:2,value:'InquiryReturnOrder',text:"询价退回下单"},
    {num:3,value:'InquiryQuoteReceivable',text:"询价应收报价"},
    {num:4,value:'InquiryReturnQuote',text:"询价退回报价"},
    {num:5,value:'InquiryPendingReview',text:"询价待审核"},
    {num:6,value:'InquiryAuditReturn',text:"询价审核退回"},
    {num:7,value:'InquiryAudited',text:"询价已审核"},
    {num:8,value:'InquirySuccessfulBidder',text:"询价已中标"},
    {num:9,value:'InquiryUnsuccessfulBidders',text:"询价未中标"},
    {num:10,value:'InquiryEnd',text:"询价终结"},
    {num:11,value:'InquiryDelete',text:"询价删除"},
    {num:12,value:'OrderITC',text:"订单派车中"},
    {num:13,value:'OrderRTTO',text:"订单退回下单"},
    {num:14,value:'OrderHSC',text:"订单已派车"},
    {num:15,value:'OrderBTS',text:"订单退回派车"},
    {num:16,value:'OrderWFTD',text:"订单待发货"},
    {num:17,value:'OrderTCHBD',text:"订单货已送达"},
    {num:18,value:'OrderOEND',text:"订单终结"},
    {num:19,value:'OrderDelete',text:"订单删除"},
    {num:20,value:'Evaluate',text:"评价"},
    {num:21,value:'System',text:"系统通知"}
	]
  registerStateList=[
    {value:1,text:"已注册"},
    {value:2,text:"未注册"},
    
  ]
}
