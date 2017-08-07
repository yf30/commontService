import { Component , OnInit ,Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit{

  isFolded:boolean = false;
  @Output()
  changeNavLeft:EventEmitter<any> = new EventEmitter();
  
    constructor(private router:Router) { }
    app={
        name:"公共服务系统"
    };
    realName:string = "";
    asideFolded:boolean = true;
    fullscreen:boolean = true;
    faStyle = {
      faDedent:"",
      faExpand:""
    };

    ngOnInit() {
      if(window.sessionStorage.getItem('loginData') && window.sessionStorage.getItem('loginData') !="null"){
        this.realName = JSON.parse(window.sessionStorage.getItem('loginData')).userName;
        this.setClasses();
      }else{
        // this.router.navigateByUrl('login');
      }

    }

    setClasses = () =>{
      this.faStyle = {
        faDedent: this.asideFolded ? "fa fa-fw fa-dedent" : "fa fa-fw fa-indent",
        faExpand: this.fullscreen ? "fa fa-fw fa-expand" : "fa fa-fw fa-compress",
      }
    }

    changeDedentIcon =() =>{
      if(this.asideFolded){
        this.asideFolded = false;
        this.isFolded = true;
        this.changeNavLeft.emit(this.isFolded); 
      }else{
        this.asideFolded = true;
        this.isFolded = false;
        this.changeNavLeft.emit(this.isFolded); 
      }
      this.setClasses();
    }
    
    // changeExpandIcon = () =>{
    //   if(this.fullscreen){
    //     this.fullscreen = false;
    //   }else{
    //     this.fullscreen = true;
    //   }
    //   this.setClasses();
    // }

    logout():void{
      window.sessionStorage.clear();
      this.router.navigateByUrl('login');
    }

}