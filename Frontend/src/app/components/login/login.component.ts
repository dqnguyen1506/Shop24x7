import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup = new FormGroup({})
  submitted = false
  wrongInput = false

  constructor(private fb: FormBuilder, private route: Router) {}

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      })
  }

  // convenience getter for easy access to form fields
  get f() { return this.userLoginForm.controls; }

  authenticateUser(){
    this.submitted = true
    // stop here if form is invalid
    if (this.userLoginForm.invalid) {
      return;
    }
    
    this.route.navigate(['/register'])
    // const userMatch = this.usersList.filter(user => 
    //   user.email === this.userLoginForm.get('email')?.value &&
    //   user.password === this.userLoginForm.get('password')?.value
    // )
    // if(userMatch.length === 1){
    //   GlobalConstants.currUsername = userMatch[0].name
    //   this.route.navigate(['/home'])
    // }
    // else{
    //   this.wrongInput = true
    // }

  }

}