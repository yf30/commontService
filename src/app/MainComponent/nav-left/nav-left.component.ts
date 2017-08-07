
import { Component,ElementRef, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent implements OnInit {
  total:any="";

  constructor() { }
  pathname="";
  ngOnInit() {
      $('.auto').click(function(e){
          $(this).parent().toggleClass('active');
          $(this).parent().siblings(".active").removeClass('active');
      })
    
  }
  
  

}
