import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ComparePassword } from 'src/app/confirm-equal-validator';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegistrationForm: FormGroup = new FormGroup({})
  submitted = false
  registerSuccess = false;

  constructor(private fb: FormBuilder, private _userService: UserService) {}

  ngOnInit() {
    this.userRegistrationForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      }, { 
      validator: ComparePassword('password', 'confirmPassword')
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.userRegistrationForm.controls; }

  registerNewUser(){
    this.submitted = true
    // stop here if form is invalid
    if (this.userRegistrationForm.invalid) {
      return;
    }
    this.registerSuccess = true
    // console.log(this.userRegistrationForm.get())
    this._userService.registerUser(this.userRegistrationForm)
    .subscribe(data => {
      console.log(data)
    })
  }

}
