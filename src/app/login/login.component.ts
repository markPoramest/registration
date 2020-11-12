import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  constructor(private service:RegistrationService, private router:Router) {

   }

  ngOnInit(): void {
  }
  loginUser(){
   
    this.service.loginUserFromRemote(this.user).subscribe(
      data => {console.log("response recievd");
      this.router.navigate(['/main']);
    },

      error => {console.log("exception occured");
      (function ($) {
        $('#ModalFail').modal('show');
      })(jQuery);
       }
    )
  }

  gotoRegister(){
      this.router.navigate(['/register']);
  }

}
