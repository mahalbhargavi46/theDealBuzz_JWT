import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private _user:UserService, private _router:Router) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm){
    this._user.login(form.value)
    .subscribe(
      res=>{

      }
    )
  }
  // moveToRegister(){
  //   this._router.navigate(['/register']);
  // }
  // login(){
  //   if(!this.loginForm.valid){
  //     console.log("Invalid Credentials");
  //     return;
  //   }
  //   else{
  //     //console.log(JSON.stringify(this.loginForm.value));
  //     this._user.login(JSON.stringify(this.loginForm.value))
  //     .subscribe(
  //       data=>{console.log(data);this._router.navigate(['/user']);
  //     },
  //       error=>{console.error(error);}
  //     )
  //   }
  // }
}
