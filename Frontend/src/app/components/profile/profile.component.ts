import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})

export class ProfileComponent implements OnInit {

  email : any = ''
  profile: any = {
    "_id": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "phoneNumber": "",
    "interests": [],
    "profileImage": "",
    "address": {
      "streetAddress": "",
      "city": "",
      "state": "",
      "zipcode": ""
    }
  }

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    let e = localStorage.getItem('email')
    if (e)
      this.email = e
    
    this.userService.getProfile(this.email).subscribe(v=> {
      if (v.profile[0])
        this.profile = v.profile[0]
    })
  }

  deleteImage() {
    let pic = document.getElementById('profile-img')
    if (pic)
    {
      var typ = document.createAttribute('src')
      typ.value = 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'
      pic.attributes.setNamedItem(typ)
      this.profile.profileImage = typ.value
    }
  }

  uploadImage() {
    let pic = document.getElementById('profile-img') as HTMLImageElement
    let upload = document.getElementById('img') as HTMLInputElement
    let file = upload.files?.item(0)

    if (pic && upload && file)
    {
      pic.src = URL.createObjectURL(file);
      this.profile.profileImage = pic.src
    }
  }

  editAddress() {
    let addressText = document.getElementById('address')
    let button = document.getElementById('editAddressButton')
    let edit = document.getElementById('editAdd')
    let street = document.getElementById('street') as HTMLInputElement
    let city = document.getElementById('city') as HTMLInputElement
    let state = document.getElementById('state') as HTMLInputElement
    let zip = document.getElementById('zip') as HTMLInputElement
    if (button && addressText && edit && street && city && state && zip)
    {
      if (button.innerHTML == 'Edit')
      {
        button.innerHTML = 'Save'
        addressText.style.visibility = 'hidden'
        edit.style.visibility = 'visible'
        street.value = this.profile.address.streetAddress
        city.value = this.profile.address.city
        state.value = this.profile.address.state
        zip.value = this.profile.address.zipcode
      }
      else
      {
        button.innerHTML = 'Edit'
        addressText.style.visibility = 'visible'
        edit.style.visibility = 'hidden'
        this.profile.address.streetAddress = street.value
        this.profile.address.city = city.value
        this.profile.address.state = state.value
        this.profile.address.zipcode = zip.value
        this.userService.editAddress(this.email, street.value, city.value, state.value, zip.value).subscribe(v => {
          console.log(v)
        })
      }
    }
  }
}
