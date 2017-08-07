import { DataService } from './../Service/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
// import {LoginService} from '../services/loginService'
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private DataService:DataService,
    private router: Router) { }

  ngOnInit() {
    // $('#login').text('Magic');
  }
  userName="";
  password="";

  login(): void {    
    this.DataService.login(this.userName,this.password).subscribe(res=>{
      window.sessionStorage.setItem('loginData',JSON.stringify(res));
      this.router.navigateByUrl('app/homepage');
    });
    
  }

}
