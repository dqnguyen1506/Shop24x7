import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //Form validation for the checkout form
  addingUser = new FormGroup({
    streetaddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
  })

  //Inforamtion catching for checkout form 
  email : any = ''
  profile: any = {
    "firstName": "",
    "lastName": "",
    "email": ""
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let e = localStorage.getItem('email')
    if (e)
      this.email = e
    
    this.userService.getProfile(this.email).subscribe(v=> {
      if (v.profile[0])
        this.profile = v.profile[0]
    })
  }

  receivingUserData() {
    console.log(this.addingUser)
  }

}
