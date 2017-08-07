import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    isFolded:boolean = false;
    constructor() { }
  
    ngOnInit() {
      
    }
  
    changeLeft(event){
      this.isFolded = event;
    }

}
