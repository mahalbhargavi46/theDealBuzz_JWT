import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    name : new FormControl(null,Validators.required),
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,Validators.required),
    cpass : new FormControl(null,Validators.required),
    address : new FormControl(null,Validators.required),
    phoneNumber : new FormControl (null, Validators.required)
  });
  constructor(private _router:Router, private _userService:UserService) { }

  ngOnInit(): void {
  }
  moveToLogin(){
    this._router.navigate(['/login']);
  }
  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
      console.log("invalid form");
      return;
    }
    else{
      this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        //if the user is successfully registered the data will be console logged and he will routed to the login page.
        data=>{console.log(data); this._router.navigate(['/login']);},
        error => console.log(error)
      )
      //console.log(JSON.stringify(this.registerForm.value));
    }
  }
}
