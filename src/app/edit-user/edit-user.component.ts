import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Validators, FormGroup , FormControl } from '@angular/forms';
declare var jQuery: any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user = new User();
  userForm = new FormGroup({
    id : new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  get id() { return this.userForm.get('id'); }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }

  constructor(private _service:RegistrationService, private _route:Router, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
   let id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
   this._service.fetchUserListbyIdFromRemote(id).subscribe(
     data=>{
      console.log("Success");
      this.user = data;
     },
     error => console.log("error")
   )

  }
  updateUser(){
    this._service.editUserFromRemote(this.userForm, this.user).subscribe(
      data => {
        console.log("Success");
        (function ($) {
          $('#ModalSuccess').modal('show');
        })(jQuery);
      },
      error => {
        console.log("Error");
        (function ($) {
          $('#ModalFail').modal('show');
        })(jQuery);
    }
    )
  
  }
  gotoList(){
    this._service.fetchUserListFromRemote().subscribe(
      data => {
        console.log("Success");
        this._route.navigate(['main']);
      },
      error => console.log("Error")
    )
  }

}
