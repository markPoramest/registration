import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import * as $ from "jquery";
declare var jQuery: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  user = new User();
  constructor(private service:RegistrationService, private router:Router) {
   
   }

  ngOnInit(): void {

}

  
  registerUser(){
    this.service.registerUserFromRemote(this.user).subscribe(
      data=>{
        console.log("Register Success");
        (function ($) {
          $('#ModalSuccess').modal('show');
        })(jQuery);
        
      },
      error=>{
        (function ($) {
          $('#ModalFail').modal('show');
        })(jQuery);
        console.log("Register Unsuccess")}
    );
  }
  gotoLogin(){
    this.router.navigate(['']);
  }    
}
