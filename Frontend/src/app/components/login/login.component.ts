import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup = new FormGroup({})
  submitted = false
  wrongInput = false
  notFound = false

  constructor(private fb: FormBuilder, private route: Router, private _userService: UserService) {}

  ngOnInit() {
    localStorage.setItem('email', '')
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      })
    // //reset token and role upon rendering /role
    // localStorage.removeItem('token')
    // localStorage.removeItem('role')
    // console.log("token @/login: " + localStorage.getItem('token'))
    // console.log("role @/role: " + localStorage.getItem("role"))
  }

  // convenience getter for easy access to form fields
  get f() { return this.userLoginForm.controls; }

  authenticateUser(){
    this.submitted = true
    // stop here if form is invalid
    if (this.userLoginForm.invalid) {
      return;
    }
    this._userService.authenticateUser(this.userLoginForm)
    .subscribe( (data) => {
      //login success
      if(data.status === "success"){
        this.notFound = false
        //set token and role from the server response
        localStorage.setItem("token", data.token)
        localStorage.setItem("email", this.userLoginForm.controls['email'].value)
        localStorage.setItem("role", data.role)
        alert(localStorage.getItem("role"))
        //go to home
        this.route.navigate(['/home'])
      }
    }, (error) => {
      this.notFound = true
    })
  }

}